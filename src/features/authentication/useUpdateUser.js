import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClint = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (obj) => updateCurrentUser(obj),

    onSuccess: () => {
      toast.success("User successfully updated");
      queryClint.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
