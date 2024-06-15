"use client";
import { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useSession } from "@/hooks/useSession.util";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const { authStatus, session } = useSession();

  useLayoutEffect(() => {
    if (authStatus !== "loading" && authStatus === "unauthenticated") {
      router.push("/auth");
    }
  }, [authStatus, router]);

  return (
    <GlobalFrame contents={authStatus === "authenticated" && path === "/"}>
      {authStatus !== "loading" && children}
    </GlobalFrame>
  );
}
