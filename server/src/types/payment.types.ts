import { Document, Types } from "mongoose"

interface Notes {
    fullname: string;
    email: string;
}

export interface Payment extends Document {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    orderId: string;
    receipt: string;
    amount: number;
    currency?: string;
    amountPaid?: number;
    amountDue: number;
    status?: string;
    attempts?: number;
    notes: Notes
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPaymentDocument extends Payment, Document {}