import { useState } from "react";
import supabase from "@/libs/SupabaseClient.lib";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("SignIn successful!");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signIn, isLoading };
};
