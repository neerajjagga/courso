import InstructorSignUpForm from "../../components/auth/InstructorSignUpForm"
import InstructorSignUpImage from '../../assets/InstructorSignUp.webp';

const InstructorSignUp = () => {

    return (
        <div className="flex items-center justify-center gap-10 mt-12 md:mt-24">

            <div className="hidden lg:block">
                <img className="xl:w-[90%]" src={InstructorSignUpImage} alt="Instructor SignUp Illustration" />
            </div>

            {/* modal */}
            <div className="bg-[#16181f] pt-10 pb-5 px-6 rounded-2xl flex flex-col gap-6 w-full sm:w-[80%] lg:w-[80%] xl:w-1/2 z-10">

                <div className="text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">Welcome to <span className="bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent">Courso Instructors</span></h2>
                    <p className="text-sm text-gray-300 md:text-base">Share your knowledge. Inspire learners. Grow your impact</p>
                </div>

                <InstructorSignUpForm />

            </div>

            {/* gradient */}
            <div className="absolute bottom-0 bg-blue-600 rounded-full w-80 h-80 blur-[200px] opacity-80">
            </div>

        </div>
    )
}

export default InstructorSignUp