import { useState } from "react";
import { toast } from "react-toastify";
import { textsConfig } from "@/config/texts.config";
import { createClient } from "@/libs/supabase/client.lib";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const supabase = createClient();
  const router = useRouter();

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
      toast(textsConfig.TOAST.SIGN_IN.SUCCESS);

      setTimeout(() => {
        supabase.auth.refreshSession().then(() => {
          window.location.href = "/";
        });
      }, 1000);
      return true;
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_IN.ERROR);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading };
};
