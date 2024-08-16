"use client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useInitialize } from "@/hooks/useInitialize.hook";
import { useSetData } from "@/hooks/useSetData.hook";
import { GlobalDataType } from "@/types";

export const Provider = ({
  children,
  globalData,
}: {
  children: React.ReactNode;
  globalData: GlobalDataType;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ProviderInner globalData={globalData}>{children}</ProviderInner>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const ProviderInner = ({
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
