"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useGetUser } from "@/hooks/api/useGetUser.hook";
import { useSession } from "@/hooks/useSession.util";
import { SessionState, UserState } from "@/recoil/atoms.recoil";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  const setUser = useSetRecoilState(UserState);

  const { data } = useGetUser();
  const { authStatus, session } = useSession();

  const setSession = useSetRecoilState(SessionState);

  useEffect(() => {
    setSession(session);
    if (session) {
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.access_token}`;
    }
  }, [session, setSession]);

  useEffect(() => {
    if (authStatus !== "loading" && authStatus === "unauthenticated") {
      process.env.NODE_ENV === "production" && router.push("/auth");
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

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
