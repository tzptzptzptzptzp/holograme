"use client";
import { useEffect } from "react";
import { useSession as useNextAuthSession } from "next-auth/react";
import { useSessionStore } from "@/stores/session.store";

export const useSession = () => {
  const { data: session, status } = useNextAuthSession();
  const { setSession, setAuthStatus } = useSessionStore();

  useEffect(() => {
    if (status === "loading") {
      setAuthStatus("loading");
    } else if (session) {
      setSession(session);
      setAuthStatus("authenticated");
    } else {
      setSession(null);
      setAuthStatus("unauthenticated");
    }
  }, [session, status, setSession, setAuthStatus]);

  return { session, authStatus: status };
};
