import { useEffect } from "react";
import axios from "axios";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/client.lib";
import { useSessionStore } from "@/stores/session.store";

export const useSession = () => {
  const { session, authStatus, setSession, setAuthStatus } = useSessionStore();

  const supabase = createClient();

  useEffect(() => {
    const handleSession = async (event: string, session: Session | null) => {
      if (session) {
        setSession(session);
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${session.access_token}`;
      } else {
        setSession(null);
      }
    };

    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      handleSession("SIGNED_IN", data.session);
    };

    fetchSession().catch((error) => {
      console.error("Error fetching user:", error);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleSession(event, session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth, setSession]);

  return { authStatus, session };
};
