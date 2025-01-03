import toast from "react-hot-toast";
import { useEffect } from "react";
const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if(fallback) fallback();
        else toast.error(error?.data?.message || "An error occurred");
      }
    });
  }, [errors]);
};

export default useErrors;