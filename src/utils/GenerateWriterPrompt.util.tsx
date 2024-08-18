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
  const prompt = `
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
    - 形式
        - マークダウン形式で見出しや強調、リストなどを適切に使用する
    - 文字数
        - 指定された文字数以上で記事を生成する
    - 構成  
        - H1 ページタイトル <title></title>に挿入するタイトル  
        - H1 概要 <meta name="description" content"">に挿入する概要  
        - H1 本文  
            - 導入（本文へスムーズに誘導する読者を引き込む魅力的な導入を作成）
                - この記事を読むことでこんなメリットがある、こんな事に困っていませんか？など
            - 本文（メインとなるセクション「詳細情報の記事構成・見出しリスト」を参照して作成）
                - 実例や活用法を示してより具体的に分かりやすく
                - 記事構成・見出しリストの内容はそのまま使用しない（解説記事などから引用しているため）
                    - H2で指定した「記事構成・見出しリスト」にそれぞれ１〜３個程度のH3セクションを作成し、具体例や解説など自然な流れで内容を膨らませる
            - まとめ（記事の要点を分かりやすくまとめたセクション）
                - この部分だけ読むだけでも記事の内容がざっくりと分かる程度のしっかりしたまとめを作成する
    - その他
        - メタ情報のページタイトル、概要はSEO対策を意識した魅力的なタイトル、概要を設定する
        - 文章は読みやすく、理解しやすい表現を心がける
        - 読者を惹きつける導入を記事の先頭に挿入する
        - 集客記事の場合は記事の要所に適切に収益記事へ誘導するような内容を入れ込む
            - 収益記事：商品やサービスの紹介記事でアフィリエイトなどから収益を発生させる記事
            - 集客記事：商品ランキングやまとめ記事など収益記事に誘導するための記事
        - H2、H3を基本的に使用し、必要であればH4も使用する H5、H6は使用しない
  `;

  return prompt;
};
