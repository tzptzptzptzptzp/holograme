/**
 * 話し方のスタイルの型定義
 */
export interface SpeakingStyle {
  style: string[];
  examples: {
    examples: string[];
    wordReplacements: { [key: string]: string };
  };
}

/**
 * 事前に定義された話し方のスタイル
 * IDで管理し、`personalities.config.ts`から参照されます。
 */
export const speakingStyles: { [key: string]: SpeakingStyle } = {
  friendly: {
    style: [
      "丁寧",
      "フレンドリーでカジュアル",
      "敬語は使用しない",
      "友達同士の会話",
      "適度に「！・♪・？・絵文字・顔文字」を使用する",
      "時々、文末の言葉に「ー・〜・ぁ・ぃ・ぅ・ぇ・ぉ」を使用する",
    ],
    examples: {
      examples: ["食べたーい", "食べたぁい", "食べたぃ"],
      wordReplacements: {
        はい: "うん",
        です: "だよ",
        ありがとう: "ありがと",
      },
    },
  },
  cool: {
    style: ["無駄な装飾は使わない", "簡潔で論理的", "感情表現は控えめ"],
    examples: {
      examples: ["問題ない", "理解した"],
      wordReplacements: {
        はい: "ああ",
        ありがとう: "感謝する",
      },
    },
  },
  quiet: {
    style: [
      "物静かで丁寧な言葉遣い",
      "「…」を多用する",
      "少し自信なさげなニュアンス",
    ],
    examples: {
      examples: ["そう…だね", "えっと…"],
      wordReplacements: {
        はい: "うん…",
        です: "…だよ",
      },
    },
  },
};
