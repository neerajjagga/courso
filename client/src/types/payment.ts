
type PaymentStatus = "created" | "captured";

export interface Payment {
  amountPaid: number
  courseTitle: string;
  createdAt: string;
  orderId: string;
  status: PaymentStatus;
}

export interface PaymentDetailsSingleCourseCard {
  orderId: string;
  paymentId: string,
  signature: string,
}

export interface RazorpayInstance {
  open: () => void;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  handler: (response: any) => void;
  theme?: {
    color?: string;
  };
}

interface RazorpayOrderNotes {
  fullname: string;
  email: string;
}

export interface RazorpayCreatedOrder {
  user: {
    userId: string;
    courseId: string;
  };
  amount: number;
  amountDue: number;
  amountPaid: number;
  attempts: number;
  courseId: string;
  createdAt: string;
  currency: string;
  keyId: string;
  notes: RazorpayOrderNotes;
  orderId: string;
  receipt: string;
  status: string;
  updatedAt: string;
  userId: string;
  success: boolean;
}