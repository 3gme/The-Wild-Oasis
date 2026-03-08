import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClint = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (newSettings) => {
      updateSetting(newSettings);
    },
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClint.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error("Settings can't be updated");
      throw new Error(err.message);
    },
  });

  return { isUpdating, updateSettings };
}
