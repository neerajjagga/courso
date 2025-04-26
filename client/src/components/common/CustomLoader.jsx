import { Loader } from "lucide-react"

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-bg-primary">
      <div className="text-white animate-spin">
        <Loader size={40} />
      </div>
    </div>
  )
}

export default CustomLoader