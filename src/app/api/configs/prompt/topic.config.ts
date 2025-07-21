/**
 * AIが話すトピックの型定義
 */
export interface Topic {
  id: string; // プログラムで識別するためのID
  name: string; // UI表示用の名前
  description: string; // AIに与える具体的な指示
}

/**
 * AIが話すトピックのリスト
 */
export const topicList: Topic[] = [
  {
    id: "greeting",
    name: "挨拶",
    description: "ユーザーへの挨拶を生成してください。",
  },
  {
    id: "trivia",
    name: "豆知識",
    description: "何か面白い豆知識を一つ、披露してください。",
  },
  {
    id: "fortune",
    name: "今日の運勢",
    description: "今日の運勢を占って、ユーザーに伝えてください。",
  },
  {
    id: "what_day_is_it",
    name: "今日は何の日",
    description: "今日がどんな日なのか（記念日など）を調べて、教えてください。",
  },
  {
    id: "weather",
    name: "今日の天気",
    description: "今日の天気について、一言つぶやいてください。",
  },
  {
    id: "time_based_greeting",
    name: "時間帯の挨拶",
    description:
      "現在の時間帯に合った挨拶をしてください。（例：おはよう、こんにちは、こんばんは）",
  },
  {
    id: "seasonal_topic",
    name: "季節の話題",
    description:
      "現在の季節に関する話題を一言つぶやいてください。（例：桜、夏休み、紅葉、雪）",
  },
  {
    id: "simple_question",
    name: "簡単な質問",
    description: "ユーザーに対して、何か簡単な質問を投げかけてください。",
  },
  {
    id: "positive_phrase",
    name: "ポジティブな一言",
    description:
      "ユーザーが元気になるような、ポジティブな一言を伝えてください。",
  },
  {
    id: "monologue",
    name: "キャラクターの独り言",
    description:
      "キャラクターが考えていそうな、個人的な独り言をつぶやいてください。",
  },
];
