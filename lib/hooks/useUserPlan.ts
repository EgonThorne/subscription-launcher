import useSWR from "swr";
import type { UserPlan } from "@prisma/client";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUserPlan() {
  const { data: session } = useSession();

  const { data, error, mutate } = useSWR<UserPlan | null>(
    session?.user?.id ? `/api/user-plan` : null,
    fetcher
  );

  return {
    userPlan: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
