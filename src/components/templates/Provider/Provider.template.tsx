"use client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useInitialize } from "@/hooks/useInitialize.hook";
import { useWatch } from "@/hooks/useWatch.hook";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ProviderInner>{children}</ProviderInner>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const ProviderInner = ({ children }: { children: React.ReactNode }) => {
  useInitialize();
  useWatch();
  return children;
};
