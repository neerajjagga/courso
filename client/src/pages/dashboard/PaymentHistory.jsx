import { useFetchUserPaymentHistory } from "../../hooks/payment/useFetchUserPaymentHistory";
import CustomLoader from '../../components/common/CustomLoader';

const PaymentHistory = () => {
    const { data: paymentHistory, isPending } = useFetchUserPaymentHistory();

    return (
        <div className="px-3 pt-2 md:pt-4 sm:px-12 xl:px-28">
            <div className="flex flex-col gap-2 md:gap-6">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-opacity-30 border-b-gray-500">
                    <h1 className="text-[1.30rem] font-bold xs:text-2xl sm:text-3xl">Payment History</h1>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-gray-100 bg-gray-800">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Order ID / Transaction ID</th>
                                <th className="p-3">Items</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        {isPending ? (
                            <div className="flex items-center justify-center w-full h-full">
                                <CustomLoader />
                            </div>
                        ) : (
                            paymentHistory.length !== 0 ? (
                                <tbody className="text-gray-300 bg-gray-900">
                                    {paymentHistory.map((payment, index) => (
                                        <tr key={index} className="border-b border-gray-700 last:border-none">
                                            <td className="p-3 whitespace-nowrap">{new Date(payment.createdAt).toLocaleString()}</td>
                                            <td className="p-3 break-all">{payment.orderId}</td>
                                            <td className="p-3">{payment.courseTitle}</td>
                                            <td className="p-3">{payment.amountPaid / 100}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`font-semibold ${payment.status === "captured"
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                        }`}
                                                >
                                                    {payment.status === "captured" ? "Success" : "Failed"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <div>
                                    <h2>No Payment History Found</h2>
                                </div>
                            )
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PaymentHistory;
