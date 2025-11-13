"use client";
import { useInitialize } from "@/hooks/useInitialize.hook";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  useInitialize();
  return children;
};
