"use client";
import { useSession } from "next-auth/react";

export const useGetMe = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    isLoading: status === "loading",
  };
};
