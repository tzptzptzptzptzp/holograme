"use client";
import { useEffect } from "react";
import { Avatar } from "@/components/atoms/Avatar/Avatar.atom";
import { Navigation } from "@/components/organisms/Navigation/Navigation. organism";
import { useDevice } from "@/hooks/useDevice.hook";
import { useSession } from "@/hooks/auth/useSession.hook";
import { useSelectedContentStore } from "@/stores/selectedContent.store";

export default function VerifiedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isPc, isSp } = useDevice();
  const { session, setAuthToken } = useSession();

  const selectedContent = useSelectedContentStore(
    (state) => state.selectedContent
  );

  const isHomeContent = selectedContent === "home";

  // コンポーネントがマウントされた時に認証トークンをセット
  useEffect(() => {
    if (session) {
      setAuthToken(session);
    }
  }, [session, setAuthToken]);

  return (
    <div className="flex s:flex-col z-10 w-full h-full pr-20 s:pr-0 s:pb-20">
      {
        /* PC表示のアバター */
        isPc && (
          <div className="flex items-end relative top-0 w-[50%] h-full pl-4">
            <Avatar />
          </div>
        )
      }
      <div className="flex flex-col items-center justify-center s:justify-start flex-1 s:flex-auto relative top-0 s:z-10 w-[50%] s:w-full min-w-[600px] s:min-w-0 h-full pr-10 pl-4 s:p-4 s:pb-2 u-shadow-sm">
        {!isLoading && children}
      </div>
      {
        /* SP表示のアバター - 選択中のコンテンツがホームの場合のみ表示 */
        isSp && isHomeContent && (
          <div className="hidden s:flex flex-none items-end justify-center relative top-0 z-0 h-full max-h-[62svh] pl-4 s:px-2">
            <Avatar />
          </div>
        )
      }
      {!isLoading && <Navigation />}
    </div>
  );
}
