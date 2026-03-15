import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useDeleteBooking() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${bookingId} is successfully deleted`);
    },

    onError: (err) => console.error(err.message),
  });
  return { deleteBooking, isDeleting };
}
