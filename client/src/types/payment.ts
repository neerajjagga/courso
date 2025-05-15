
type PaymentStatus = "created" | "captured";

export interface Payment {
    amountPaid: number
    courseTitle: string;
    createdAt: string;
    orderId: string;
    status: PaymentStatus;
}