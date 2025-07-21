import { characterProfile } from "../../configs/character/profile.config";
import {
  personalities,
  Personality,
} from "../../configs/character/personalities.config";
import {
  speakingStyles,
  SpeakingStyle,
} from "../../configs/prompt/speakingStyles.config";
import {
  outputFormats,
  OutputFormat,
} from "../../configs/prompt/outputFormats.config";
import { COMMON_PURPOSE } from "../../configs/prompt/common.config";
import { User } from "@prisma/client";

/**
 * システムプロンプトデータの型定義
 */
export interface SystemPromptData {
  role: string;
  purpose: string;
  user?: User;
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
      traits: string[];
    };
    communication: {
      speakingStyle: {
        id: string;
        rules: string[];
        examples: string[];
        wordReplacements: { [key: string]: string };
      };
    };
  };
  outputFormat: {
    format: string;
    content: string;
    style: string[];
  };
  customInstructions: string[];
  behaviorRules: string[];
}

/**
 * システムプロンプト作成オプション
 */
export interface CreateSystemPromptOptions {
  personalityId?: string;
  outputFormatId?: string;
  customInstructions?: string[];
  format?: "json" | "markdown";
  userData?: User;
}

/**
 * システムプロンプトを作成するヘルパー関数
 */
export function createSystemPrompt(
  options: CreateSystemPromptOptions = {}
): string {
  const {
    personalityId = "cheerful_clumsy",
    outputFormatId = "defaultMarkdown",
    customInstructions = [],
    format = "json",
    userData,
  } = options;

  // 設定を取得
  const personality = personalities[personalityId];
  const outputFormat = outputFormats[outputFormatId];

  if (!personality) {
    throw new Error(`Personality with ID '${personalityId}' not found`);
  }

  if (!outputFormat) {
    throw new Error(`Output format with ID '${outputFormatId}' not found`);
  }

  const speakingStyle = speakingStyles[personality.speakingStyleId];

  if (!speakingStyle) {
    throw new Error(
      `Speaking style with ID '${personality.speakingStyleId}' not found`
    );
  }

  // システムプロンプトデータを作成
  const systemPromptData = createSystemPromptData({
    personalityId,
    outputFormatId,
    customInstructions,
    userData,
  });

  // フォーマットに応じて出力形式を変更
  if (format === "markdown") {
    return createMarkdownSystemPrompt(systemPromptData);
  }

  return JSON.stringify(systemPromptData, null, 2);
}

/**
 * マークダウン形式のシステムプロンプトを作成（互換性のため）
 */
function createMarkdownSystemPrompt(data: any): string {
  const userSection = data.user
    ? `
# ユーザー情報
あなたが会話する相手のユーザー情報です。この情報を参考にして、より個人的で親しみやすい会話を心がけてください。

- ユーザー名: ${data.user.username}
- ニックネーム: ${data.user.nickname}
- メールアドレス: ${data.user.email}
- 場所: ${data.user.location}
- 登録日: ${new Date(data.user.createdDate).toLocaleDateString("ja-JP")}

`
    : "";

  return `
# 役割と目的
${data.purpose}
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
`.trim();
}

/**
 * 構造化されたシステムプロンプトデータを作成
 */
export function createSystemPromptData(
  options: CreateSystemPromptOptions = {}
): SystemPromptData {
  const {
    personalityId = "cheerful_clumsy",
    outputFormatId = "defaultMarkdown",
    customInstructions = [],
    userData,
  } = options;

  // 設定を取得
  const personality = personalities[personalityId];
  const outputFormat = outputFormats[outputFormatId];

  if (!personality) {
    throw new Error(`Personality with ID '${personalityId}' not found`);
  }

  if (!outputFormat) {
    throw new Error(`Output format with ID '${outputFormatId}' not found`);
  }

  const speakingStyle = speakingStyles[personality.speakingStyleId];

  if (!speakingStyle) {
    throw new Error(
      `Speaking style with ID '${personality.speakingStyleId}' not found`
    );
  }

  const baseData: SystemPromptData = {
    role: "character_chatbot",
    purpose: COMMON_PURPOSE,
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
    ],
  };

  // ユーザーデータが提供されている場合は追加
  if (userData) {
    baseData.user = {
      id: userData.id,
      username: userData.username,
      nickname: userData.nickname,
      email: userData.email,
      location: userData.location,
      createdDate: userData.createdDate,
      updatedDate: userData.updatedDate,
    };

    // ユーザー情報が利用可能な場合の追加指示
    baseData.behaviorRules.push(
      "ユーザー情報が提供されている場合は、その情報を参考にしてより個人的で親しみやすい会話を心がけてください"
    );
  }

  return baseData;
}

/**
 * 利用可能な性格IDを取得
 */
export function getAvailablePersonalityIds(): string[] {
  return Object.keys(personalities);
}

/**
 * 利用可能な出力フォーマットIDを取得
 */
export function getAvailableOutputFormatIds(): string[] {
  return Object.keys(outputFormats);
}

/**
 * 性格設定を取得
 */
export function getPersonality(personalityId: string): Personality | null {
  return personalities[personalityId] || null;
}

/**
 * 話し方スタイルを取得
 */
export function getSpeakingStyle(
  speakingStyleId: string
): SpeakingStyle | null {
  return speakingStyles[speakingStyleId] || null;
}

/**
 * 出力フォーマットを取得
 */
export function getOutputFormat(outputFormatId: string): OutputFormat | null {
  return outputFormats[outputFormatId] || null;
}
