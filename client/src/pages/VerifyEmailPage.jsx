import VerifyEmailForm from '../components/VerifyEmailForm';
import { useUserStore } from '../stores/useUserStore';

const VerifyEmailPage = () => {
    const { user } = useUserStore();

    return (
        <>
            <VerifyEmailForm>
                <span className="text-3xl font-bold">Verify your <span className="text-blue-500">Email</span></span>
                <div className="flex gap-2">
                    <span className="text-gray-400">
                        We sent a verification code to
                    </span>
                    <span>
                        {user?.email}
                    </span>
                </div>
            </VerifyEmailForm>
        </>
    )
}

export default VerifyEmailPage