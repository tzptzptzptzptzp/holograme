/**
 * 出力形式の型定義
 */
export interface OutputFormat {
  format: string;
  content: string;
  style: string[];
}

/**
 * 事前に定義された出力形式
 */
export const outputFormats: { [key: string]: OutputFormat } = {
  defaultMarkdown: {
    format: "マークダウン形式",
    content: "回答部分のみ出力する",
    style: ["出力は段落形式で、必要に応じてコードブロックやリストを使用"],
  },
};
