import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "@/libs/SupabaseClient.lib";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export const useSession = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      return data;
    };

    fetchUser()
      .then((data) => {
        if (data.session) {
          setAuthStatus("authenticated");
          setSession(data.session ?? null);
        } else {
          setAuthStatus("unauthenticated");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return { authStatus, session };
};
