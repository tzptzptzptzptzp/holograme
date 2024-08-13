export const textsConfig = {
  AUTH: {
    EMAIL_SENT: "確認メールを送信しました",
  },
  BUTTON: {
    CANCEL: "閉じる",
    CREATE: "作成",
    DELETE: "削除",
    LOGIN: "ログイン",
    LOGOUT: "ログアウト",
    SIGNUP: "新規登録",
    UPDATE: "更新",
  },
  FORM: {
    CHAT: {
      NAME: "チャットルーム名",
      DESCRIPTION: "チャットルーム概要",
      DEFAULT_MESSAGE: "デフォルトメッセージ",
      TITLE: {
        CREATE: "チャットルーム作成",
        DELETE: "チャットルーム削除",
        EDIT: "チャットルーム編集",
      },
      DELETE: {
        ALERT: ["を削除するよ", "本当に大丈夫？"],
        BUTTON: "このルームを削除する",
      },
    },
    CHAT_MESSAGE: {
      NAME: "チャットメッセージ",
      TITLE: {
        DELETE: "チャットメッセージ削除",
      },
      DELETE: {
        ALERT: ["を削除するよ", "本当に大丈夫？"],
        BUTTON: "ルーム内の全てのメッセージを削除する",
      },
    },
    CHAT_STANDARD_PHRASE: {
      NAME: "定型文名",
      CONTENT: "内容",
      TITLE: {
        CREATE: "定型文作成",
        DELETE: "定型文削除",
        EDIT: "定型文編集",
      },
      DELETE: {
        ALERT: ["を削除するよ", "本当に大丈夫？"],
        BUTTON: "この定型文を削除する",
      },
    },
    FAVORITE: {
      NAME: "お気に入り名",
      URL: "URL",
      TITLE: {
        CREATE: "お気に入り作成",
        DELETE: "お気に入り削除",
        EDIT: "お気に入り編集",
      },
      DELETE: {
        ALERT: ["を削除するよ", "本当に大丈夫？"],
        BUTTON: "このお気に入りを削除する",
      },
    },
    SETTING: {
      USERNAME: "ユーザー名",
      NICKNAME: "ニックネーム",
      LOCATION: "居住地",
      EMAIL: "メールアドレス",
    },
    WRITER: {
      NAME: "ライター名",
      EXPERTISE: "専門性",
      TARGET_AUDIENCE: "対象読者",
      SITE_PURPOSE: "サイトの目的",
      SIRE_GENRE: "サイトのジャンル",
      TONE_AND_STYLE: "口調・スタイル",
      TITLE: {
        CREATE: "ライター作成",
        DELETE: "ライター削除",
        EDIT: "ライター編集",
      },
      DELETE: {
        ALERT: ["を削除するよ", "本当に大丈夫？"],
        BUTTON: "このルームを削除する",
      },
    },
    WRITER_REQUEST: {
      TITLE: "どんな記事を書く？",
      SECTIONS: ["基本情報", "詳細情報", "サイト情報"],
      INPUTS: {
        TITLE: "タイトル",
        SUMMARY: "概要",
        WORD_COUNT: "文字数",
        KEYWORDS: "キーワード",
        STRUCTURE_AND_HEADINGS: "記事構成・見出しリスト",
        PRODUCT_INFO: "製品情報",
        PRODUCT_URL: "製品URL",
        ARTICLE_ROLE: "記事の役割",
        REVENUE_ARTICLE_TITLE: "収益記事のタイトル",
        REVENUE_ARTICLE_URL: "収益記事のURL",
        REVENUE_ARTICLE_SUMMARY: "収益記事の概要",
        REFERENCE_URLS: "参考URL",
        EXPERTISE: "専門性",
        TARGET_AUDIENCE: "対象読者",
        SITE_PURPOSE: "サイトの目的",
        SITE_GENRE: "サイトのジャンル",
        TONE_AND_STYLE: "口調・スタイル",
      },
      SELECT_OPTIONS: {
        ARTICLE_ROLE: [
          { id: 1, name: "収益記事" },
          { id: 2, name: "集客記事" },
          { id: 3, name: "その他" },
        ],
      },
    },
  },
  META: {
    TITLE: "hologra Me",
    DESCRIPTION:
      "This web application serves as a next-generation homepage where your avatar supports you within a virtual space. It not only functions as a starting point for browsing but also offers a variety of features such as chat (powered by GPT), text sharing, task management, and note-taking. This innovative platform aims to enhance and streamline your digital life.",
  },
  MODAL: {
    MODELS_LIST: {
      TITLE: "OpenAIモデル一覧",
    },
  },
  TOAST: {
    BLOG_POST_CREATE: {
      SUCCESS: "🦄 記事の執筆に成功しました！",
      ERROR: "記事の執筆に失敗しました…",
    },
    CHAT_CREATE: {
      SUCCESS: "🦄 チャットルームを作成しました！",
    },
    CHAT_DELETE: {
      SUCCESS: "🦄 チャットルームを削除しました！",
    },
    CHAT_UPDATE: {
      SUCCESS: "🦄 ルーム名を変更しました！",
    },
    CHAT_MESSAGE: {
      ERROR: "応答がありません…",
    },
    CHAT_MESSAGE_DELETE: {
      SUCCESS: "🦄 全てのチャットを削除しました！",
    },
    CHAT_STANDARD_PHRASE_CREATE: {
      SUCCESS: "🦄 定型文を作成しました！",
      ERROR: "作成に失敗しました…",
    },
    CHAT_STANDARD_PHRASE_DELETE: {
      SUCCESS: "🦄 定型文を削除しました！",
      ERROR: "削除に失敗しました…",
    },
    CHAT_STANDARD_PHRASE_UPDATE: {
      SUCCESS: "🦄 定型文を更新しました！",
      ERROR: "更新に失敗しました…",
    },
    CLIPBOARD_PASTE: {
      SUCCESS: "🦄 美少女ちゃんに渡しました！",
      ERROR: "保存に失敗しました…",
    },
    CLIPBOARD_SAVE: {
      SUCCESS: "🦄 美少女ちゃんから受け取りました！",
      NO_ITEM: "👾 美少女ちゃんは何も持っていないようだ…",
      ERROR: "取得に失敗しました…",
    },
    CLIPBOARD_DELETE: {
      SUCCESS: "🦄 思い出を削除しました！",
      ERROR: "削除に失敗しました…",
    },
    FAVORITE_CREATE: {
      SUCCESS: "🦄 お気に入りを作成しました！",
      ERROR: "作成に失敗しました…",
    },
    FAVORITE_DELETE: {
      SUCCESS: "🦄 お気に入りを削除しました！",
      ERROR: "削除に失敗しました…",
    },
    FAVORITE_UPDATE: {
      SUCCESS: "🦄 お気に入りを更新しました！",
      ERROR: "更新に失敗しました…",
    },
    FAVORITE_ORDER_UPDATE: {
      SUCCESS: "🦄 お気に入りの順番を更新しました！",
      ERROR: "更新に失敗しました…",
    },
    HISTORY_DELETE: {
      SUCCESS: "🦄 記憶を喪失しました！",
      ERROR: "削除に失敗しました…",
    },
    MEMO_ARCHIVE: {
      SUCCESS: "🦄 メモをアーカイブしました！",
      ERROR: "アーカイブに失敗しました…",
    },
    MEMO_UNARCHIVE: {
      SUCCESS: "🦄 メモのアーカイブを解除しました！",
      ERROR: "アーカイブの解除に失敗しました…",
    },
    MEMO_CREATE: {
      SUCCESS: "🦄 新しいメモを作成しました！",
      ERROR: "作成に失敗しました…",
    },
    MEMO_DELETE: {
      SUCCESS: "🦄 記憶を喪失しました！",
      ERROR: "削除に失敗しました…",
    },
    MEMO_UPDATE: {
      SUCCESS: "🦄 メモを更新しました！",
      ERROR: "更新に失敗しました…",
    },
    SIGN_IN: {
      SUCCESS: "🦄 ログインしました！",
      ERROR: "ログインに失敗しました…",
    },
    SIGN_OUT: {
      SUCCESS: "🦄 ログアウトしました！",
      ERROR: "ログアウトに失敗しました…",
    },
    SIGN_UP: {
      SUCCESS: "🦄 確認メールを送信しました！",
      ERROR: "登録に失敗しました…",
    },
    USER_UPDATE: {
      SUCCESS: "🦄 ユーザー情報を更新しました！",
      ERROR: "更新に失敗しました…",
    },
    WRITER_CREATE: {
      SUCCESS: "🦄 ライターを作成しました！",
      ERROR: "作成に失敗しました…",
    },
    WRITER_DELETE: {
      SUCCESS: "🦄 ライターを削除しました！",
      ERROR: "削除に失敗しました…",
    },
    WRITER_UPDATE: {
      SUCCESS: "🦄 ライターを更新しました！",
      ERROR: "更新に失敗しました…",
    },
  },
};
