import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/server.lib";

export const useGetMe = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user ?? null);
      }
      if (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser().then(() => {
      setIsLoading(false);
    });
  }, [supabase.auth]);

  return { user, isLoading };
};
