"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { textsConfig } from "@/configs/texts.config";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithCredentials = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) throw new Error(result.error);

      toast(textsConfig.TOAST.SIGN_IN.SUCCESS);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return true;
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_IN.ERROR);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn: signInWithCredentials, isLoading };
};
