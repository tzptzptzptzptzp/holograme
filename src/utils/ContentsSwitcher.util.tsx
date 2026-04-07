import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SelectedContentType } from "@/stores/selectedContent.store";

// 動的インポートでコード分割
const HomeContents = dynamic(
  () =>
    import("@/components/features/Home/HomeContents.feature").then((mod) => ({
      default: mod.HomeContents,
    })),
  {
    loading: () => <ContentLoader />,
  },
);

const ChatContents = dynamic(
  () =>
    import("@/components/features/Chat/ChatContents.feature").then((mod) => ({
      default: mod.ChatContents,
    })),
  {
    loading: () => <ContentLoader />,
  },
);

const ClipboardContents = dynamic(
  () =>
    import("@/components/features/Clipboard/ClipboardContents.feature").then(
      (mod) => ({ default: mod.ClipboardContents }),
    ),
  {
    loading: () => <ContentLoader />,
  },
);

const WriterContents = dynamic(
  () =>
    import("@/components/features/Writer/WriterContents.feature").then(
      (mod) => ({ default: mod.WriterContents }),
    ),
  {
    loading: () => <ContentLoader />,
  },
);

const HistoryContents = dynamic(
  () =>
    import("@/components/features/History/HistoryContents.feature").then(
      (mod) => ({ default: mod.HistoryContents }),
    ),
  {
    loading: () => <ContentLoader />,
  },
);

const MemoContents = dynamic(
  () =>
    import("@/components/features/Memo/MemoContents.feature").then((mod) => ({
      default: mod.MemoContents,
    })),
  {
    loading: () => <ContentLoader />,
  },
);

const SettingContents = dynamic(
  () =>
    import("@/components/features/Setting/SettingContents.feature").then(
      (mod) => ({ default: mod.SettingContents }),
    ),
  {
    loading: () => <ContentLoader />,
  },
);

// ローディングコンポーネント
const ContentLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export const ContentsSwitcher = (selectedContent: SelectedContentType) => {
  return (
    <Suspense fallback={<ContentLoader />}>
      {(() => {
        switch (selectedContent) {
          case "chat":
            return <ChatContents />;
          case "clipboard":
            return <ClipboardContents />;
          case "writer":
            return <WriterContents />;
          case "history":
            return <HistoryContents />;
          case "memo":
            return <MemoContents />;
          case "setting":
            return <SettingContents />;
          default:
            return <HomeContents />;
        }
      })()}
    </Suspense>
  );
};
