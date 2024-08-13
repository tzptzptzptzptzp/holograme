type GenerateWriterPromptType = {
  title: string;
  summary: string;
  wordCount: number;
  keywords: string;
  structureAndHeadings: string;
  productInfo: string;
  productUrl: string;
  articleRole: string;
  revenueArticleTitle: string;
  revenueArticleUrl: string;
  revenueArticleSummary: string;
  referenceUrls: string;
  expertise: string;
  targetAudience: string;
  sitePurpose: string;
  siteGenre: string;
  toneAndStyle: string;
};

export const GenerateWriterPrompt = ({
  title,
  summary,
  wordCount,
  keywords,
  structureAndHeadings,
  productInfo,
  productUrl,
  articleRole,
  revenueArticleTitle,
  revenueArticleUrl,
  revenueArticleSummary,
  referenceUrls,
  expertise,
  targetAudience,
  sitePurpose,
  siteGenre,
  toneAndStyle,
}: GenerateWriterPromptType): string => {
  const prompt =
    `
  下記情報を元に、SEO対策を意識し、検索順位を上げるための適切なブログ記事を執筆してください。
  
  - 基本情報（記事単位）
    - タイトル: ${title}
    - 概要: ${summary}
    - 文字数: ${wordCount}
  
  - 詳細情報（記事単位）
    - キーワード: ${keywords}
    - 記事構成・見出しリスト: ${structureAndHeadings}
    - 商品情報: ${productInfo}
    - 商品URL: ${productUrl}
    - 記事の役割: ${articleRole}
    - 収益記事タイトル: ${revenueArticleTitle}
    - 収益記事URL: ${revenueArticleUrl}
    - 収益記事概要: ${revenueArticleSummary}
    - 参考サイトURL: ${referenceUrls}
  
  - ブログ情報（サイト単位）
    - 対象読者: ${targetAudience}
    - サイトの目的: ${sitePurpose}
    - サイトのジャンル: ${siteGenre}
    - 口調・スタイル: ${toneAndStyle}
  
  -  ライター情報（サイト単位）
    - 専門性: ${expertise}
  
  - 出力条件
    - マークダウン形式で見出しや強調、リストなどを適切に使用する
    - 読者を惹きつける導入を記事の先頭に挿入する
    - 記事本文の構成は以下のようにする
      - 導入
      - 本文
      - まとめ
    - 集客記事の場合は記事の要所に適切に収益記事へ誘導するような内容を入れ込む
    - h2、h3を基本的に使用し、必要であればh4も使用する h5、h6は使用しない
    - メタ情報のtitle、descriptionも合わせて出力し、SEO対策を意識した魅力的なタイトル、概要を設定する
    - 以下のオブジェクト形式で返却する` +
    "(```jsonでラップしない)" +
    `{
    "title": "ブログタイトル" : string;
    "description": "ブログ概要" : string;
    "content": "記事本文" : string;
  }
  `;

  return prompt;
};
