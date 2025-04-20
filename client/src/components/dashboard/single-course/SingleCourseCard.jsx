import { useEffect, useState } from 'react';
import { useCreateRzpOrder, useVerifyPayment } from '../../../hooks/payment.hooks';
import { useAuthUser } from '../../../hooks/useAuthUser';
import toast from 'react-hot-toast';

const SingleCourseCard = ({ course }) => {
    const user = useAuthUser();
    const [order, setOrder] = useState(null);

    const { mutate: createOrder, isPending } = useCreateRzpOrder(course.id, setOrder);
    const { mutate: verifyPayment, isPending: isVerifyingPayment } = useVerifyPayment();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const notifyAndVerifyPayment = (paymentDetails) => {
        const toastId = toast.loading("Verifying your payment...");

        verifyPayment(paymentDetails, {
            onSuccess: (res) => {
                toast.success("Payment verified successfully!", { id: toastId });
            },
            onError: (err) => {
                toast.error("Payment verification failed!", { id: toastId });
            },
        });
    }

    useEffect(() => {
        if (order) {
            const options = {
                key: order.keyId,
                amount: order.amount,
                currency: 'INR',
                name: 'Courso',
                description: 'Master new skills with Courso',
                order_id: order.orderId,
                prefill: {
                    name: user.fullname,
                    email: user.email,
                },
                handler: async function (response) {
                    console.log(response);
                    const paymentDetails = {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    }
                    console.log("---------------------------paymentDetails in handler");
                    console.log(paymentDetails);
                    notifyAndVerifyPayment(paymentDetails);
                },
                theme: {
                    color: '#030712'
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
    }, [order, user]);

    const handleBuyNow = () => {
        createOrder();
    };

    return (
        <div className="flex flex-col max-w-sm gap-4 mx-auto overflow-hidden border border-gray-200 shadow-xl bg-blue-50 rounded-2xl">
            <img
                src={course.courseImageUrl}
                alt={`${course.title} Course thumbnail`}
                className="w-full object-cover xl:h-[240px]"
            />

            <div className="flex flex-col gap-4 px-2 py-2">
                <div className="mb-2">
                    <p className="text-sm text-gray-700">PRICE</p>
                    <div className="text-2xl font-bold text-gray-900">₹{course.price}</div>
                </div>

                <button
                    onClick={handleBuyNow}
                    className={`${isPending ? "btn-secondary-disabled" : "btn-secondary"}`}
                    disabled={isPending || isVerifyingPayment}
                >
                    {isPending ? "Processing..." : "Buy Now"}
                </button>
            </div>
        </div>
    );
};

export default SingleCourseCard;