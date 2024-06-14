import { useState } from "react";
import { toast } from "react-toastify";
import { textsConfig } from "@/config/texts.config";
import supabase from "@/libs/SupabaseClient.lib";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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
      toast(textsConfig.TOAST.SIGN_UP.SUCCESS);
      setIsEmailSent(true);
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_UP.ERROR);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signUp, isEmailSent, isLoading };
};
