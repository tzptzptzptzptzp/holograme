import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "@supabase/supabase-js";
import { textsConfig } from "@/config/texts.config";
import supabase from "@/libs/SupabaseClient.lib";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setUser(user);
      toast(textsConfig.TOAST.SIGN_UP.SUCCESS);
      setIsEmailSent(true);
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_UP.ERROR);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { user, signUp, isEmailSent, isLoading };
};
