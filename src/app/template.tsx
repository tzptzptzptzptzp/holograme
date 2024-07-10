"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useSession } from "@/hooks/useSession.util";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  const { authStatus } = useSession();

  useEffect(() => {
    if (authStatus !== "loading" && authStatus === "unauthenticated") {
      process.env.NODE_ENV === "production" && router.push("/auth");
    }
  }, [authStatus, router]);

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
