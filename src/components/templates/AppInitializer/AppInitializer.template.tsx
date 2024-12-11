"use client";
import { useInitialize } from "@/hooks/useInitialize.hook";
import { useSetData } from "@/hooks/useSetData.hook";
import { GlobalDataType } from "@/types";

export const AppInitializer = ({
  children,
  globalData,
}: {
  children: React.ReactNode;
  globalData: GlobalDataType;
}) => {
  useInitialize();
  useSetData(globalData);
  return children;
};
