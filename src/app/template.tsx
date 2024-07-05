"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useGetUser } from "@/hooks/api/useGetUser.hook";
import { useSession } from "@/hooks/useSession.util";
import {
  ChatRoomState,
  FavoriteChatRoomIdState,
  SessionState,
} from "@/recoil/atoms.recoil";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  const chatRoom = useRecoilValue(ChatRoomState);
  const favoriteChatRoomId = useRecoilValue(FavoriteChatRoomIdState);

  const setSession = useSetRecoilState(SessionState);

  const { authStatus, session } = useSession();

  const { refetch: chatRefetch } = useGetChat();
  const { refetch: chatMessagesRefetch } = useGetChatMessage(
    favoriteChatRoomId || chatRoom?.id || 0
  );
  const { refetch: userRefetch } = useGetUser();

  useEffect(() => {
    setSession(session);
    if (session) {
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.access_token}`;
      chatRefetch();
      chatMessagesRefetch();
      userRefetch();
    }
  }, [chatRefetch, chatMessagesRefetch, session, setSession, userRefetch]);

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
