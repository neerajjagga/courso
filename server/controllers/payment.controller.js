import razorpayInst from './../lib/Razorpay.js';
import Payment from '../models/payment.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import EnrolledCourse from '../models/enrolledCourse.model.js';
import Module from '../models/module.model.js';
import UserCourseProgress from '../models/userCourseProgress.model.js';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import { sendCourseReceipt, sendPaymentFailedEmail } from '../lib/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();

export const createOrder = async (req, res) => {
    const user = req.user;
    try {
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
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create order",
        });
    }
}

export const validateWebhook = async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const webhookSignature = req.headers["x-razorpay-signature"];

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

    } catch (error) {
        console.error("Error in validate webhook:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const verifyPayment = async (req, res) => {
    try {
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

        return res.json({
            success: true,
            message: "Payment verified successfully"
        });
    } catch (error) {
        console.error("Error in verifying payment:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// we can do manual capturing also
// const handleAuthorizedPayments = async (paymentDetails) => {
//     const capturedResponse = await razorpayInst.payments.capture(paymentDetails.id, paymentDetails.amount);
//     console.log("--------------capturedResponse----------");
//     console.log(capturedResponse);
// }

const handleCapturedPayments = async (paymentDetails) => {
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    // update the payment status
    payment.status = paymentDetails.status;
    payment.amountPaid = paymentDetails.amount;
    payment.amountDue = 0;
    await payment.save();

    const course = await Course.findById(payment.courseId);

    // with payment document i will have access to userId as well as courseId

    const user = await User.findById(payment.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found.',
        });
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
        lectures: m.lectures.map(l => ({
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
    await sendCourseReceipt(user.email, course.title, payment.updatedAt, payment.amountPaid, course?.courseImageUrl);
}

const handleFailedPayments = async (paymentDetails) => {
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    payment.status = paymentDetails.status;
    payment.attempts += 1;
    await payment.save();

    const user = await User.findById(payment.userId);
    const course = await Course.findById(payment.courseId);

    await sendPaymentFailedEmail(user.email, course.title, payment.updatedAt, payment.amountDue, paymentDetails.error_description, course?.courseImageUrl);
}