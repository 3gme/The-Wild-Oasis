import { useQuery } from "@tanstack/react-query";
import { getBookingsCount } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookingsCount() {
  const [searchParams] = useSearchParams();
  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    filterValue === null || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          op: "eq",
        };

  // Sort
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // Pagination
  // const pageIndex = searchParams.get("page") || 1;

  const {
    data: count,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookingsCount", filterValue, sortBy],
    queryFn: () => getBookingsCount({ filter, sortBy }),
  });

  return { count, isPending, error };
}
