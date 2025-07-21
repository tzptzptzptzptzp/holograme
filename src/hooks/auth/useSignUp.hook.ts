import { useState } from "react";
import { toast } from "react-toastify";
import { textsConfig } from "@/configs/texts.config";
import { createClient } from "@/libs/supabase/client.lib";
import { usePostUser } from "../api/usePostUser.hook";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const mutate = usePostUser();

  const supabase = createClient();

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
      if (user) {
        const id = user.id;
        const email = user.email ?? "";
        mutate({ id, email });
      }
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
