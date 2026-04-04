import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const dateRange = Number(searchParams.get("last")) || 7;

  const queryDate = subDays(new Date(), dateRange).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${dateRange}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { isLoading, stays, confirmedStays, dateRange };
}
