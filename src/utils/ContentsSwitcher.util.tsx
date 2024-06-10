import dynamic from "next/dynamic";
import { SelectedContentStateType } from "@/recoil/types.recoil";

const HomeContents = dynamic(() =>
  import("@/components/features/Home/HomeContents.feature").then(
    (mod) => mod.HomeContents
  )
);
const ChatContents = dynamic(() =>
  import("@/components/features/Chat/ChatContents.feature").then(
    (mod) => mod.ChatContents
  )
);
const ClipboardContents = dynamic(() =>
  import("@/components/features/Clipboard/ClipboardContents.feature").then(
    (mod) => mod.ClipboardContents
  )
);
const HistoryContents = dynamic(() =>
  import("@/components/features/History/HistoryContents.feature").then(
    (mod) => mod.HistoryContents
  )
);
const SettingContents = dynamic(() =>
  import("@/components/features/Setting/SettingContents.feature").then(
    (mod) => mod.SettingContents
  )
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
