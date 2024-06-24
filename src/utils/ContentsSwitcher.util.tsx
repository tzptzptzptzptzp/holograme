import dynamic from "next/dynamic";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { SelectedContentStateType } from "@/recoil/types.recoil";
import { HomeContents } from "@/components/features/Home/HomeContents.feature";

const ChatContents = dynamic(
  () =>
    import("@/components/features/Chat/ChatContents.feature").then(
      (mod) => mod.ChatContents
    ),
  { loading: () => <Loader /> }
);
const ClipboardContents = dynamic(
  () =>
    import("@/components/features/Clipboard/ClipboardContents.feature").then(
      (mod) => mod.ClipboardContents
    ),
  { loading: () => <Loader /> }
);
const HistoryContents = dynamic(
  () =>
    import("@/components/features/History/HistoryContents.feature").then(
      (mod) => mod.HistoryContents
    ),
  { loading: () => <Loader /> }
);
const SettingContents = dynamic(
  () =>
    import("@/components/features/Setting/SettingContents.feature").then(
      (mod) => mod.SettingContents
    ),
  { loading: () => <Loader /> }
);

export const ContentsSwitcher = (selectedContent: SelectedContentStateType) => {
  switch (selectedContent) {
    case "chat":
      return <ChatContents />;
    case "clipboard":
      return <ClipboardContents />;
    case "history":
      return <HistoryContents />;
    case "setting":
      return <SettingContents />;
    default:
      return <HomeContents />;
  }
};
