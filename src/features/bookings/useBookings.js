import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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
  const pageIndex = Number(searchParams.get("page")) || 1;

  const {
    data: { bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, pageIndex],
    queryFn: () => getAllBookings({ filter, sortBy, pageIndex }),
    keepPreviousData: true,
  });

  // PreFetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (pageIndex < pageCount) {
    const next = pageIndex >= pageCount ? pageCount : pageIndex + 1;

    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, next],
      queryFn: () => getAllBookings({ filter, sortBy, pageIndex: next }),
    });
  }
  if (pageIndex >= 1) {
    const prev = pageIndex >= 1 ? 1 : pageIndex - 1;

    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, prev],
      queryFn: () => getAllBookings({ filter, sortBy, pageIndex: prev }),
    });
  }

  return { bookings, isLoading, error, count };
}
