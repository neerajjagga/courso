import LoginForm from "../../components/auth/LoginForm"

const Login = () => {

  return (
    <div className="flex items-center justify-center mt-12 md:mt-40">

      {/* modal */}
      <div className="bg-[#16181f] pt-10 pb-5 px-6 rounded-2xl flex flex-col gap-6 w-full lg:w-1/2 xl:w-1/3 z-10">

        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Welcome back to <span className="bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent">Courso</span>
          </h2>
          <p className="text-sm text-gray-300 md:text-base">Log in to access your personalized dashboard</p>
        </div>

        <LoginForm />

      </div>

      {/* gradient */}
      <div className="absolute bottom-0 bg-blue-600 rounded-full w-80 h-80 blur-[200px] opacity-80">
      </div>

    </div>
  )
}

export default Login