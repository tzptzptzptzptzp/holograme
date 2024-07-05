"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useGetUser } from "@/hooks/api/useGetUser.hook";
import { useSession } from "@/hooks/useSession.util";
import { SessionState } from "@/recoil/atoms.recoil";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  const setSession = useSetRecoilState(SessionState);

  const { authStatus, session } = useSession();

  const { refetch: chatRefetch } = useGetChat();
  const { refetch: userRefetch } = useGetUser();

  useEffect(() => {
    setSession(session);
    if (session) {
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.access_token}`;
      chatRefetch();
      userRefetch();
    }
  }, [chatRefetch, session, setSession, userRefetch]);

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
