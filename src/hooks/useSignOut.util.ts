import { useState } from "react";
import supabase from "@/libs/SupabaseClient.lib";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert("SignUp successful!");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signOut, isLoading };
};
