"use client";
import { Avatar } from "@/components/atoms/Avatar/Avatar.atom";
import { Navigation } from "@/components/organisms/Navigation/Navigation. organism";

export default function VerifiedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex s:hidden items-end relative top-0 w-[50%] h-full pl-4">
        <Avatar />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 s:flex-auto relative top-0 s:z-10 w-[50%] s:w-full min-w-[600px] s:min-w-0 h-full pr-10 pl-4 s:p-4 u-shadow-sm">
        {children}
      </div>
      <div className="hidden s:flex flex-none items-end justify-center relative top-0 z-0 h-full max-h-[62svh] pl-4 s:px-2">
        <Avatar />
      </div>
      <Navigation />
    </>
  );
}
