"use client";
import { RecoilRoot } from "recoil";
import { useInitialize } from "@/hooks/useInitialize.hook";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <ProviderInner>{children}</ProviderInner>
    </RecoilRoot>
  );
};

const ProviderInner = ({ children }: { children: React.ReactNode }) => {
  useInitialize();
  return children;
};
