import razorpayInst from './../lib/Razorpay.js';
import Payment from '../models/payment.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import dotenv from 'dotenv';
dotenv.config();

export const createOrder = async (req, res) => {
    try {
        const user = req.user;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found",
            });
        }

        const orderData = {
            amount: course.price.amount * 100, // paisa
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
        console.log("------------paymentDetails---------------");
        console.log(paymentDetails);

        if (!paymentDetails.order_id) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is missing in the payment data',
            });
        }

        switch (paymentDetails.status) {
            case "authorized":
                await handleAuthorizedPayments(paymentDetails)
                break;

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

const handleAuthorizedPayments = async (paymentDetails) => {
    const capturedResponse = await razorpayInst.payments.capture(paymentDetails.id, paymentDetails.amount);
    console.log("--------------capturedResponse----------");
    console.log(capturedResponse);
}

const handleCapturedPayments = async (paymentDetails) => {
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    console.log("----------------payment in capture");
    console.log(payment);

    // update the payment status
    payment.status = paymentDetails.status;
    payment.amountPaid = paymentDetails.amount;
    payment.amountDue = 0;
    await payment.save();

    // with payment document i will have access to userId as well as courseId
    // now i have to update the user activeCourses array and push the courseId in it

    const user = await User.findByIdAndUpdate(payment.userId, {
        $addToSet: { enrolledCourses: payment.courseId }
    }, { new: true });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found.',
        });
    }

    console.log("----------------user in capture");
    console.log(user);
}

const handleFailedPayments = async (paymentDetails) => {
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    payment.status = paymentDetails.status;
    await payment.save();

    console.log("----------------payment in failed");
    console.log(payment);
}