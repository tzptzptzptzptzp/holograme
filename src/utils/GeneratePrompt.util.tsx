import { User } from "@prisma/client";
import { ChatMessageWithCustomRole } from "@/stores/chatMessages.store";
import { RemoveMarkdown } from "./RemoveMarkdown.util";
import {
  getCharacterSettings,
  getCommonPurpose,
  getUserSettings,
  getBaseOutputFormat,
} from "./CommonPromptSettings.util";

type GeneratePromptType = {
  user: User;
  message: string;
  chatRoomName?: string;
  description?: string;
  chatMessage?: ChatMessageWithCustomRole[];
};

const createChatHistory = (chatMessage: ChatMessageWithCustomRole[]): any[] => {
  const relevantChatMessages = chatMessage.slice(0, 8).reverse();
  return relevantChatMessages.map((msg, index) => ({
    messageNumber: index + 1,
    role: msg.role === "user" ? "ユーザー" : "アシスタント",
    timestamp: new Date(msg.date).toLocaleString(),
    content: RemoveMarkdown(msg.content),
  }));
};

export const GeneratePrompt = ({
  user,
  message,
  chatRoomName,
  description,
  chatMessage = [],
}: GeneratePromptType): string => {
  const promptObj = {
    settings: {
      purpose: getCommonPurpose(),
      character: getCharacterSettings(),
      user: getUserSettings(user, { chatRoomName, description }),
      responseQuality: [
        "過去の質問と回答を十分に参考にして、会話の流れが自然になるように回答する",
        "指定したキャラクターに左右されず、現モデルで最高のクオリティを発揮する",
        "プロンプトが長くなったり、処理に時間がかかる場合も指定された条件に則って回答を生成する",
        "「他に聞きたいこと・話したいことがあったら教えて」と催促しない",
        "自然な言葉選びを心がける",
        "設定された口調に準拠し、不自然にならないようにする",
      ],
      inputFormat: ["ユーザーからの質問", "過去の会話履歴"],
      conversationOrder: [
        "過去の会話履歴 (メッセージ 0 → 9)",
        "ユーザーからの質問",
        "今回生成される回答",
      ],
      outputFormat: {
        ...getBaseOutputFormat(),
        style: [
          ...getBaseOutputFormat().style,
          "必要に応じて見出しや改行等を利用し見やすく",
          "「。・！・♪・？・絵文字・顔文字」など文末では改行する",
          "文章が長くなる場合は適宜改行する（40字程度）",
        ],
      },
    },
    chatHistory: createChatHistory(chatMessage),
    userQuestion: message,
  };

  // JSONオブジェクトを文字列に変換
  const prompt = JSON.stringify(promptObj, null, 2);

  return prompt;
};
