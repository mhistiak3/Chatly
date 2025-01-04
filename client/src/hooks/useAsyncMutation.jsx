import { useState } from "react";
import toast from "react-hot-toast";

const useAsyncMutation = (mutationFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationFn();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Please wait...");
    try {
      const res = await mutate(...args);
      if (res?.data) {
        toast.success(res?.data.message || "Friend request sent", {
          id: toastId,
        });
        setData(res?.data);
      } else {
        toast.error(res.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
   
    }
  };

  return [executeMutation, isLoading, data];
};
export default useAsyncMutation;
