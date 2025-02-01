import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, 
    orderId: { type: String, required: true, unique: true }, 
    receipt: { type: String, required: true },
    amount: { type: Number, required: true }, 
    currency: { type: String, default: "INR" },
    amountPaid: { type: Number, default: 0 },
    amountDue: { type: Number, required: true },
    status: { type: String, default: "created" },
    attempts: { type: Number, default: 0 },
    notes: {
        fullname: { type: String, required: true },
        email: { type: String, required: true }
    },
}, {
    timestamps: true
});

PaymentSchema.set('toJSON', {
    versionKey : false,
    transform : function(doc, ret) {
        delete ret._id;
    }
})

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
