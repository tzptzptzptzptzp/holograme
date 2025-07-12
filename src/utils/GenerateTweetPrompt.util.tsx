import { GetRandomItem } from "./GetRandomItem.util";
import { User } from "@prisma/client";
import {
  getCharacterSettings,
  getCommonPurpose,
  getUserSettings,
  getBaseOutputFormat,
} from "./CommonPromptSettings.util";

const topicList = ["挨拶", "豆知識", "今日の運勢", "今日は何の日"];

type GenerateTweetPromptType = {
  user: User;
};

export const GenerateTweetPrompt = ({
  user,
}: GenerateTweetPromptType): string => {
  const topic = GetRandomItem(topicList);

  const promptObj = {
    settings: {
      purpose: getCommonPurpose(),
      character: getCharacterSettings(),
      user: getUserSettings(user),
      responseQuality: [
        "自然な言葉選びを心がける",
        "設定された口調に準拠し、不自然にならないようにする",
      ],
      inputFormat: "生成する文章の内容",
      outputFormat: {
        ...getBaseOutputFormat(),
        style: [
          ...getBaseOutputFormat().style,
          "「。・！・♪・？・絵文字・顔文字」など文末では改行する",
          "文章が長くなる場合は適宜改行する（40字程度）",
          "文字数は100文字以下にする",
        ],
      },
    },
    topic: topic,
  };

  // JSONオブジェクトを文字列に変換
  const prompt = JSON.stringify(promptObj, null, 2);

  return prompt;
};
