import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
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
  const pageIndex = searchParams.get("page") || 1;

  const {
    data: { bookings, count } = {},
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, pageIndex],
    queryFn: () => getAllBookings({ filter, sortBy, pageIndex }),
    keepPreviousData: true,
  });

  // safe defaults while loading
  // const bookings = data?.bookings ?? [];
  // const count = data?.count ?? 0;

  // Treat refetching (isFetching) as loading to prevent the table from rendering stale/empty state
  const loading = isLoading || isFetching;
  console.log(isFetching);

  return { bookings, isLoading: loading, error, count };
}
