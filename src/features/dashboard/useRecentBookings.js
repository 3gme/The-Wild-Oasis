import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const dateRange = Number(searchParams.get("last")) || 7;

  const queryDate = subDays(new Date(), dateRange).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${dateRange}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return { isLoading, bookings };
}
