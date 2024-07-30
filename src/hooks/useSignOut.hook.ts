import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { textsConfig } from "@/config/texts.config";
import { createClient } from "@/libs/supabase/client.lib";

export const useSignOut = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const signOut = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast(textsConfig.TOAST.SIGN_OUT.SUCCESS);
      router.push("/auth");
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_OUT.ERROR);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signOut, isLoading };
};
