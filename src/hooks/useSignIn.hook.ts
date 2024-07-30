import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { textsConfig } from "@/config/texts.config";
import { createClient } from "@/libs/supabase/client.lib";

export const useSignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

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
      router.push("/");
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_IN.ERROR);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signIn, isLoading };
};
