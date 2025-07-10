import { HomeContents } from "@/components/features/Home/HomeContents.feature";
import { ChatContents } from "@/components/features/Chat/ChatContents.feature";
import { ClipboardContents } from "@/components/features/Clipboard/ClipboardContents.feature";
import { WriterContents } from "@/components/features/Writer/WriterContents.feature";
import { HistoryContents } from "@/components/features/History/HistoryContents.feature";
import { MemoContents } from "@/components/features/Memo/MemoContents.feature";
import { SettingContents } from "@/components/features/Setting/SettingContents.feature";
import { SelectedContentType } from "@/stores/selectedContent.store";

export const ContentsSwitcher = (selectedContent: SelectedContentType) => {
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
};
