import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (user) => signUp(user),

    onSuccess: (data) => {
      console.log(data);
      toast.success("New user added successfully");
    },

    onError: (err) => {
      console.error(err.message);
      toast.error("Can't add a new user");
    },
  });

  return { signup, isPending };
}
