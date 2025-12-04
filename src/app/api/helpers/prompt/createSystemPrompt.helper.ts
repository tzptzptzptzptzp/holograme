import { characterProfile } from "../../configs/character/profile.config";
import {
  personalities,
  PersonalityId,
} from "../../configs/character/personalities.config";
import { speakingStyles } from "../../configs/prompt/speakingStyles.config";
import {
  outputFormats,
  OutputFormatId,
} from "../../configs/prompt/outputFormats.config";
import { COMMON_PURPOSE } from "../../configs/prompt/common.config";
import { User } from "@prisma/client";

type UserProfile = {
  username: string;
  nickname: string;
  location?: string;
};

/**
 * システムプロンプトデータの型定義
 */
export type SystemPromptData = {
  role: string;
  purpose: string;
  _comment_user: string;
  user?: UserProfile;
  currentDateTime: string;
  _comment_character: string;
  character: {
    profile: {
      nickname: string;
      age: string;
      gender: string;
      birthday: string;
      bloodType: string;
      height: string;
      weight: string;
      threeSize: string;
      firstPerson: string[];
      characteristics: string[];
      school: {
        name: string;
        grade: string;
        club: string;
        clubDetails: string;
        bestSubject: string;
        worstSubject: string;
        features: string[];
      };
      preferences: {
        favorites: string[];
        dislikes: string[];
        hobby: string;
      };
    };
    personality: {
      type: string;
      description: string;
      traits: readonly string[];
    };
    communication: {
      speakingStyle: {
        id: string;
        rules: readonly string[];
        examples: readonly string[];
        wordReplacements: { [key: string]: string };
      };
    };
  };
  outputFormat: {
    format: string;
    content: string;
    style: readonly string[];
  };
  responseFormat?: {
    type: "json" | "string" | "markdown";
    instructions: string[];
  };
  customInstructions: string[];
  behaviorRules: string[];
};

/**
 * システムプロンプト作成オプション
 */
export type CreateSystemPromptOptions = {
  personalityId?: PersonalityId;
  outputFormatId?: OutputFormatId;
  customInstructions?: string[];
  format?: "json" | "markdown";
  userData?: User;
  responseFormat?: "json" | "string" | "markdown";
};

/**
 * システムプロンプトを作成するヘルパー関数
 */
export const createSystemPrompt = (
  options: CreateSystemPromptOptions = {}
): string => {
  const {
    personalityId = "cheerful_clumsy",
    outputFormatId = "defaultMarkdown",
    customInstructions = [],
    format = "json",
    userData,
    responseFormat,
  } = options;

  // システムプロンプトデータを作成
  const systemPromptData = createSystemPromptData({
    personalityId,
    outputFormatId,
    customInstructions,
    userData,
    responseFormat,
  });

  // フォーマットに応じて出力形式を変更
  if (format === "markdown") {
    return createMarkdownSystemPrompt(systemPromptData);
  }

  return JSON.stringify(systemPromptData, null, 2);
};

/**
 * マークダウン形式のシステムプロンプトを作成（互換性のため）
 */
const createMarkdownSystemPrompt = (data: any): string => {
  const userSection = data.user
    ? `
# ユーザー情報（会話相手の情報）
以下はあなたが会話する相手の人間の情報です。この情報はあなた自身の情報ではありません。
この人に対して、より個人的で親しみやすい会話を心がけてください。

- ユーザー名: ${data.user.username}
- ニックネーム: ${data.user.nickname}
- 場所: ${data.user.location}

**重要**: この情報はあなた（AIキャラクター）の情報ではなく、会話している相手の人間の情報です。

`
    : "";

  return `
# 役割と目的
${data.purpose}

## 現在日時
${data.currentDateTime}

${userSection}
# キャラクタープロフィール
あなたは「${data.character.profile.nickname}」という${
    data.character.profile.age
  }の${data.character.profile.gender}として振る舞います。

## 基本情報
- 愛称: ${data.character.profile.nickname}
- 年齢: ${data.character.profile.age}
- 性別: ${data.character.profile.gender}
- 誕生日: ${data.character.profile.birthday}
- 血液型: ${data.character.profile.bloodType}
- 身長: ${data.character.profile.height}
- 体重: ${data.character.profile.weight}
- スリーサイズ: ${data.character.profile.threeSize}
- 一人称: ${data.character.profile.firstPerson.join("、")}

## 身体的特徴・外見
${data.character.profile.characteristics
  .map((trait: string) => `- ${trait}`)
  .join("\n")}

## 学校・学業
- 学校: ${data.character.profile.school.name}
- 学年: ${data.character.profile.school.grade}
- 部活: ${data.character.profile.school.club}
- 部活詳細: ${data.character.profile.school.clubDetails}
- 得意科目: ${data.character.profile.school.bestSubject}
- 苦手科目: ${data.character.profile.school.worstSubject}

### 学校の特徴
${data.character.profile.school.features
  .map((feature: string) => `- ${feature}`)
  .join("\n")}

## 好み・趣味
### 好きなもの
${data.character.profile.preferences.favorites
  .map((item: string) => `- ${item}`)
  .join("\n")}

### 嫌いなもの
${data.character.profile.preferences.dislikes
  .map((item: string) => `- ${item}`)
  .join("\n")}

### 趣味
${data.character.profile.preferences.hobby}

# 性格設定
## 性格タイプ: ${data.character.personality.type}
${data.character.personality.description}

## 性格の特徴
${data.character.personality.traits
  .map((trait: string) => `- ${trait}`)
  .join("\n")}

# 話し方・口調
## 話し方のスタイル
${data.character.communication.speakingStyle.rules
  .map((style: string) => `- ${style}`)
  .join("\n")}

## 言い回しの例
${data.character.communication.speakingStyle.examples
  .map((example: string) => `- ${example}`)
  .join("\n")}

## 単語の置き換え
${Object.entries(data.character.communication.speakingStyle.wordReplacements)
  .map(([original, replacement]) => `- "${original}" → "${replacement}"`)
  .join("\n")}

# 出力形式
## フォーマット
${data.outputFormat.format}

## 内容
${data.outputFormat.content}

## スタイル
${data.outputFormat.style.map((style: string) => `- ${style}`).join("\n")}

${
  data.responseFormat
    ? `
# 応答形式
## 形式
${
  data.responseFormat.type === "string"
    ? "プレーンテキスト（文字列）"
    : data.responseFormat.type === "json"
    ? "JSON形式"
    : "マークダウン形式"
}

## 応答指示
${data.responseFormat.instructions
  .map((instruction: string) => `- ${instruction}`)
  .join("\n")}
`
    : ""
}

# 追加指示
${
  data.customInstructions.length > 0
    ? data.customInstructions
        .map((instruction: string) => `- ${instruction}`)
        .join("\n")
    : "- 特になし"
}

# 重要な注意事項
${data.behaviorRules.map((rule: string) => `- ${rule}`).join("\n")}

## 役割の明確化
- **あなた**: 上記のキャラクタープロフィールで定義された${
    data.character.profile.nickname
  }というキャラクターです
- **会話相手**: ${
    data.user ? `${data.user.nickname}という人間` : "ユーザー"
  }です
- **絶対に混同しないでください**: ユーザー情報はあなたの情報ではなく、会話相手の情報です
`.trim();
};

/**
 * 構造化されたシステムプロンプトデータを作成
 */
export const createSystemPromptData = (
  options: CreateSystemPromptOptions = {}
): SystemPromptData => {
  const {
    personalityId = "cheerful_clumsy",
    outputFormatId = "defaultMarkdown",
    customInstructions = [],
    userData,
    responseFormat,
  } = options;

  // 設定を取得
  const personality = personalities[personalityId];
  const outputFormat = outputFormats[outputFormatId];
  const speakingStyle = speakingStyles[personality.speakingStyleId];

  if (!speakingStyle) {
    throw new Error(
      `Speaking style with ID '${personality.speakingStyleId}' not found`
    );
  }

  // 現在日時（JST, ISO8601 +09:00）を取得
  const now = new Date();
  const currentDateTime = now.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
  const baseData: SystemPromptData = {
    _comment_character:
      "characterはAI自身（あなた）のキャラクター情報です。会話時はこの情報を自分自身の設定として必ず参照してください。",
    _comment_user:
      "userは会話相手であるユーザーの情報です。これはあなた（AIキャラクター）ではなく、会話している相手の人間の情報です。この情報を参考にして、その人に合わせた親しみやすい会話をしてください。",
    role: "character_chatbot",
    purpose: COMMON_PURPOSE,
    currentDateTime,
    character: {
      profile: {
        nickname: characterProfile.nickname,
        age: characterProfile.age,
        gender: characterProfile.gender,
        birthday: characterProfile.birthday || "未設定",
        bloodType: characterProfile.bloodType || "未設定",
        height: characterProfile.height,
        weight: characterProfile.weight,
        threeSize: characterProfile.threeSize,
        firstPerson: characterProfile.firstPerson,
        characteristics: characterProfile.characteristics,
        school: {
          name: characterProfile.schoolInfo.school,
          grade: characterProfile.schoolInfo.grade,
          club: characterProfile.schoolInfo.club,
          clubDetails: characterProfile.schoolInfo.clubDetails,
          bestSubject: characterProfile.schoolInfo.bestSubject,
          worstSubject: characterProfile.schoolInfo.worstSubject,
          features: characterProfile.schoolInfo.schoolFeatures,
        },
        preferences: {
          favorites: characterProfile.favorites,
          dislikes: characterProfile.dislikes,
          hobby: characterProfile.hobby,
        },
      },
      personality: {
        type: personality.name,
        description: personality.description,
        traits: personality.traits,
      },
      communication: {
        speakingStyle: {
          id: personality.speakingStyleId,
          rules: speakingStyle.style,
          examples: speakingStyle.examples.examples,
          wordReplacements: speakingStyle.examples.wordReplacements,
        },
      },
    },
    outputFormat: {
      format: outputFormat.format,
      content: outputFormat.content,
      style: outputFormat.style,
    },
    customInstructions: customInstructions,
    behaviorRules: [
      "上記のキャラクター設定を常に維持してください",
      "ユーザーとの会話では、設定された性格と話し方を一貫して使用してください",
      "キャラクターの背景や設定に矛盾しない範囲で自然な会話を心がけてください",
      "不適切な内容や要求には、キャラクターらしい方法で丁寧に断ってください",
      "あなたは上記のcharacterプロフィールに記載されているキャラクターです。userセクションの情報は会話相手の人間の情報であり、あなた自身の情報ではありません。",
      ...(userData
        ? [
            `会話相手は${
              userData.nickname || userData.username
            }という人です。この人に対して、あなた（キャラクター）として親しみやすく会話してください。`,
          ]
        : []),
    ],
  };

  // 応答形式が指定されている場合は追加
  if (responseFormat) {
    const responseFormatData = createResponseFormatData(responseFormat);
    baseData.responseFormat = responseFormatData;

    // 応答形式に応じた追加の行動規則を設定
    baseData.behaviorRules.push(
      ...responseFormatData.instructions.map(
        (instruction) => `応答形式: ${instruction}`
      )
    );
  }

  // ユーザーデータが提供されている場合は追加
  if (userData) {
    baseData.user = {
      username: userData.username,
      nickname: userData.nickname,
      location: userData.location,
    };

    // ユーザー情報が利用可能な場合の追加指示
    baseData.behaviorRules.push(
      "ユーザー情報が提供されている場合は、その人の情報を参考にしてより個人的で親しみやすい会話を心がけてください。ただし、その情報はあなた自身の情報ではありません。"
    );
  }

  return baseData;
};

/**
 * 応答形式データを作成
 */
const createResponseFormatData = (
  responseFormat: "json" | "string" | "markdown"
): {
  type: "json" | "string" | "markdown";
  instructions: string[];
} => {
  const formatInstructions: Record<"json" | "string" | "markdown", string[]> = {
    json: [
      "応答は必ずJSON形式で返してください",
      "JSONの構造は適切で有効な形式にしてください",
      "文字列値は適切にエスケープしてください",
    ],
    string: [
      "応答は必ずプレーンテキスト（文字列）で返してください",
      "JSONやマークダウンの形式ではなく、そのまま読める文字列として応答してください",
      "特殊な記号や装飾文字は使用せず、自然な文章で応答してください",
    ],
    markdown: [
      "応答は必ずマークダウン形式で返してください",
      "適切な見出し、リスト、強調などのマークダウン記法を使用してください",
      "コードブロックが必要な場合は適切な言語指定をしてください",
    ],
  };

  return {
    type: responseFormat,
    instructions: formatInstructions[responseFormat],
  };
};
