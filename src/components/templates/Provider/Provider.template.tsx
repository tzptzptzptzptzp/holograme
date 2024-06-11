"use client";
import { RecoilRoot } from "recoil";
import { useInitialize } from "@/hooks/useInitialize.hook";
import { useWatch } from "@/hooks/useWatch.hook";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <ProviderInner>{children}</ProviderInner>
    </RecoilRoot>
  );
};

const ProviderInner = ({ children }: { children: React.ReactNode }) => {
  useInitialize();
  useWatch();
  return children;
};
