import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { textsConfig } from "@/config/texts.config";
import { useGetInitializeData } from "@/hooks/api/useGetInitializeData.hook";
import { createClient } from "@/libs/supabase/client.lib";
import {
  ClipboardsState,
  FavoritesState,
  UserState,
} from "@/recoil/atoms.recoil";

export const useSignIn = () => {
  const supabase = createClient();

  const { refetch } = useGetInitializeData();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const setClipboards = useSetRecoilState(ClipboardsState);
  const setFavorites = useSetRecoilState(FavoritesState);
  const setUser = useSetRecoilState(UserState);

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
      try {
        await refetch().then(({ data }) => {
          if (!data) return;
          setClipboards(data.clipboardData);
          setFavorites(data.favoriteData);
          setUser(data.userData);
        });
      } catch (error) {
        throw error;
      }
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
