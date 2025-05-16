import { RequestHandler, Request, Response } from 'express';
import razorpayInst from '../lib/razorpay.js';
import Payment from '../models/payment.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import EnrolledCourse from '../models/enrolledCourse.model.js';
import Module from '../models/module.model.js';
import UserCourseProgress from '../models/userCourseProgress.model.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import { sendCourseReceipt, sendPaymentFailedEmail } from '../lib/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();
import { Course as CourseType } from '../types/course.types.js';

export const createOrder: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(400).json({
            success: false,
            message: "Course not found",
        });
    }

    // found if user has already purchased the course
    const isUserAlreadyHasCourse = await EnrolledCourse.findOne({ userId: user._id, courseId: course._id });

    if (isUserAlreadyHasCourse) {
        return res.status(400).json({
            success: false,
            message: "You already have this course",
        });
    }

    const orderData = {
        amount: course.price * 100, // paisa
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
            fullname: user.fullname,
            email: user.email,
            userId: user._id,
            courseId,
        },
    }

    const order = await razorpayInst.orders.create(orderData);
    if (!order) return res.json({
        success: false,
        message: "Failed to create Razorpay order",
    });

    // store the order info in database
    const newPayment = new Payment({
        orderId: order.id,
        receipt: order.receipt,
        amount: order.amount,
        currency: order.currency,
        amountDue: order.amount_due,
        amountPaid: order.amount_paid,
        status: order.status,
        userId: user._id,
        courseId,
        notes: {
            fullname: user.fullname,
            email: user.email,
        },
    });

    await newPayment.save();

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: { ...newPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID },
    });
});

export const validateWebhook: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error("RAZORPAY_WEBHOOK_SECRET not defined in environment variables")
    }

    const webhookSignature = typeof req.headers["x-razorpay-signature"] === "string"
        ? req.headers["x-razorpay-signature"]
        : undefined;

    if (!webhookSignature) {
        return res.status(400).json({
            success: false,
            message: "Webhook signature missing",
        });
    }

    const isValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, webhookSecret);

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: 'Invalid webhook signature',
        });
    }

    const paymentDetails = req.body.payload.payment.entity;

    if (!paymentDetails.id) {
        return res.status(400).json({
            success: false,
            message: 'Payment ID is missing in the webhook data',
        });
    }

    if (!paymentDetails.order_id) {
        return res.status(400).json({
            success: false,
            message: 'Order ID is missing in the payment data',
        });
    }

    switch (paymentDetails.status) {
        // case "authorized":
        //     await handleAuthorizedPayments(paymentDetails)
        //     break;

        case "captured":
            await handleCapturedPayments(paymentDetails)
            break;

        case "failed":
            await handleFailedPayments(paymentDetails)
            break;

        default:
            console.log("Unhandled status:", paymentDetails.status);
            break;
    }

    res.status(200).json({
        success: true,
        message: "Webhook received successfully",
    });
});

export const verifyPayment: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.body;

    const payment = await Payment.findOne({ orderId });

    if (!payment) {
        return res.status(404).json({
            success: false,
            message: "Payment not found",
        })
    }

    if (payment.status !== 'captured') {
        return res.status(400).json({
            success: false,
            message: "Payment failed",
        })
    }

    res.json({
        success: true,
        message: "Payment verified successfully"
    });
});

export const getPaymentHistory: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const paymentHistory = await Payment.find({
        userId: user._id
    })
        .sort({ createdAt: -1 })
        .select('createdAt orderId courseId amountPaid status')
        .populate<{ courseId: CourseType }>('courseId', 'title');

    const formattedHistory = paymentHistory.map(payment => ({
        createdAt: payment.createdAt,
        orderId: payment.orderId,
        amountPaid: payment.amountPaid,
        status: payment.status,
        courseTitle: payment.courseId.title
    }));

    return res.status(200).json({
        success: true,
        paymentHistory: formattedHistory
    });
});

// we can do manual capturing also
// const handleAuthorizedPayments = async (paymentDetails) => {
//     const capturedResponse = await razorpayInst.payments.capture(paymentDetails.id, paymentDetails.amount);
//     console.log("--------------capturedResponse----------");
//     console.log(capturedResponse);
// }

const handleCapturedPayments = async (paymentDetails: any) => {
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    if (!payment) {
        throw new Error("Payment not found");
    }

    // update the payment status
    payment.status = paymentDetails.status;
    payment.amountPaid = paymentDetails.amount;
    payment.amountDue = 0;
    await payment.save();

    const [course, user] = await Promise.all([
        Course.findById(payment.courseId).lean(),
        User.findById(payment.userId).lean()
    ]);

    if (!course) {
        throw new Error("Course not found");
    }

    if (!user) {
        throw new Error("User not found");
    }

    await EnrolledCourse.create({
        userId: payment.userId,
        courseId: payment.courseId
    });

    // update the user course progress

    // first fetch the modules of each course
    const modules = await Module.find({ courseId: payment.courseId }).populate('lectures');
    const cleanModules = modules.map(m => m.toJSON());

    const progress = cleanModules.map(m => ({
        moduleId: m.id,
        lectures: m.lectures?.length && m.lectures.map(l => ({
            lectureId: l.id,
            isCompleted: false,
        }))
    }));

    await UserCourseProgress.create({
        userId: payment.userId,
        courseId: payment.courseId,
        progress
    });

    // send email
    await sendCourseReceipt(
        user.email,
        course.title,
        (payment.updatedAt as Date).toISOString(),
        (payment.amountPaid as number),
        (course.courseImageUrl ?? "Image not available")
    );
}

const handleFailedPayments = async (paymentDetails: any) => {
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    if (!payment) {
        throw new Error("Payment not found");
    }

    payment.status = paymentDetails.status;
    (payment.attempts as number) += 1;
    await payment.save();

    const [course, user] = await Promise.all([
        Course.findById(payment.courseId).lean(),
        User.findById(payment.userId).lean()
    ]);

    if (!course) {
        throw new Error("Course not found");
    }

    if (!user) {
        throw new Error("User not found");
    }

    await sendPaymentFailedEmail(
        user.email,
        course.title,
        (payment.updatedAt as Date).toISOString(),
        payment.amountDue,
        paymentDetails.error_description,
        (course.courseImageUrl ?? "Image not available")
    );
}