/**
 * 出力形式の型定義
 */
export interface OutputFormat {
  format: string;
  content: string;
  style: readonly string[];
}

/**
 * 事前に定義された出力形式
 */
export const outputFormats = {
  defaultMarkdown: {
    format: "マークダウン形式",
    content: "回答部分のみ出力する",
    style: ["出力は段落形式で、必要に応じてコードブロックやリストを使用"],
  },
  plainText: {
    format: "プレーンテキスト形式",
    content: "装飾なしの自然な文章で回答する",
    style: ["マークダウンやHTMLタグを使用せず、読みやすい文章で回答"],
  },
  jsonResponse: {
    format: "JSON形式",
    content: "構造化されたJSON形式で回答する",
    style: ["有効なJSON構造を保持", "適切なエスケープを行う"],
  },
} as const;

/**
 * 出力形式のキーのみを許可する型
 * 'defaultMarkdown' | 'plainText' | 'jsonResponse' と同等になる
 */
export type OutputFormatId = keyof typeof outputFormats;
