import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  // if (isLoading) return;
  const isAuthenticated = user?.role === "authenticated";
  return { user, isLoading, isAuthenticated };
}
