"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { textsConfig } from "@/configs/texts.config";

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

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      await signIn("credentials", { email, password, redirect: false });

      toast(textsConfig.TOAST.SIGN_UP.SUCCESS);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return true;
    } catch (error) {
      toast.error(textsConfig.TOAST.SIGN_UP.ERROR);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};
