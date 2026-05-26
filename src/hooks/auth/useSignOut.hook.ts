"use client";
import { useState } from "react";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { toast } from "react-toastify";
import { textsConfig } from "@/configs/texts.config";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      await nextAuthSignOut({ redirect: false });
      toast(textsConfig.TOAST.SIGN_OUT.SUCCESS);
      window.location.href = "/auth";
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_OUT.ERROR);
    } finally {
      setIsLoading(false);
    }
    return isLoading;
  };

  return { signOut, isLoading };
};
