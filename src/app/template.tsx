"use client";
import { usePathname } from "next/navigation";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useSession } from "@/hooks/auth/useSession.hook";

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const { authStatus } = useSession();

  return (
    <GlobalFrame
      contents={
        (authStatus === "authenticated" ||
          process.env.NODE_ENV === "development") &&
        path === "/"
      }
      shadow={path === "/"}
    >
      {authStatus !== "loading" && children}
    </GlobalFrame>
  );
}
