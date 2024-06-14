import { useState } from "react";
import supabase from "@/libs/SupabaseClient.lib";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert("SignUp successful!");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signUp, isLoading };
};
