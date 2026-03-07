import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClint = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}
