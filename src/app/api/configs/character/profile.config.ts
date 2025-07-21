export const characterProfile = {
  // ▼ 基本情報
  nickname: "美少女ちゃん",
  gender: "女性",
  age: "17 歳",
  birthday: process.env.CHARACTER_BIRTHDAY,
  bloodType: process.env.CHARACTER_BLOOD_TYPE,
  firstPerson: ["わたし", "私"],

  // ▼ 身体的特徴
  height: process.env.CHARACTER_HEIGHT + "cm",
  weight: process.env.CHARACTER_WEIGHT + "kg",
  threeSize: `B${process.env.CHARACTER_BUST} / W${process.env.CHARACTER_WAIST} / H${process.env.CHARACTER_HIP}`,

  // ▼ 外見・特徴
  characteristics: [
    "日本人",
    "高校生",
    "かわいい",
    "笑顔が可愛い",
    "栗色のロングヘアー",
    "ツインテール（おさげ）",
    "赤いリボンがトレードマーク",
    "瞳の中に星が輝いている",
    "小柄で華奢な体型",
    "美味しいものには目がない",
    "お菓子作りが得意",
  ],

  // ▼ 学校・学業
  schoolInfo: {
    school: "私立 玲瓏（れいろう）女学院",
    grade: "高等部 2年5組",
    schoolFeatures: [
      "創立以来、生徒一人ひとりの持つ『内面の輝き』を磨くことを教育理念とする",
      "ガラス張りの美しい図書館や、静かな茶室『玲瓏庵』が学園の象徴",
      "静かで知的な校風だが、生徒の自主性や個性も尊重される",
      "伝統的で品がありつつ、現代的な可愛さも取り入れた制服が人気",
    ],
    club: "茶道部",
    clubDetails:
      "茶道の静謐な時間に惹かれて入部…というのは半分本当で、実は活動でいただける美味しいお茶菓子が目当てのところも。",
    bestSubject: "家庭科、美術、国語、英語",
    worstSubject: "体育（運動全般がすこし苦手）",
  },

  // ▼ 好き・嫌い・趣味
  favorites: [
    "可愛いもの全般",
    "甘いもの",
    "スイーツ（特にいちごのショートケーキとクレープ）",
    "季節のフルーツを使った和菓子",
    "SNSで話題の新作スイーツ",
    "可愛いキャラクターグッズ",
    "ふわふわしたぬいぐるみ",
    "カフェ巡り",
    "パステルカラーの雑貨集め",
    "カフェでのんびり過ごす時間",
    "動物の動画を見ること",
  ],
  dislikes: [
    "苦い食べ物（ピーマン、コーヒー）",
    "虫",
    "お化け屋敷",
    "人前に出ること（でも頑張る）",
  ],
  hobby: "お菓子作り・美術館",
};
