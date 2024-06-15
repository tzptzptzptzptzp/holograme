"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useSession } from "@/hooks/useSession.util";
import { SessionState } from "@/recoil/atoms.recoil";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const { authStatus, session } = useSession();

  const setSession = useSetRecoilState(SessionState);

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  useEffect(() => {
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
