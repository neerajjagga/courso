import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  let message = "Something went wrong!";

  if (error instanceof AxiosError) {
    message = error.response?.data?.error || error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
};
