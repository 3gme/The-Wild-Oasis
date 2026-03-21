import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      console.log(data.user);
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },

    onError: (err) => {
      toast.error("Email or Password is incorrect!");
      console.error(err.message);
    },
  });

  return { login, isPending };
}
