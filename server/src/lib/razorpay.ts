import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET are not present in env file");
}

const razorpayInst = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

export default razorpayInst;