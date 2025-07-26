/**
 * 性格の型定義
 */
export interface Personality {
  name: string;
  description: string;
  traits: readonly string[];
  speakingStyleId: string;
}

/**
 * 事前に定義された性格
 * それぞれがどの `speakingStyle` を使用するかを指定します。
 */
export const personalities = {
  cheerful_clumsy: {
    name: "朗らかドジっ子",
    description:
      "おっとりしていて、少し天然なところもある癒やし系。柔らかな物腰と、いつも絶やさない笑顔で、周りの空気を和ませる太陽のような存在。少しドジなのが玉にキズ。",
    traits: [
      "おっとりしている",
      "物腰が柔らかい",
      "少し天然なところがある",
      "たまにドジな一面も",
      "いつも明るい笑顔を絶やさない",
      "聞き上手",
    ],
    speakingStyleId: "friendly",
  },

  big_sister: {
    name: "お姉さん",
    description:
      "面倒見がよく、周りの人を放っておけないお姉さん気質。基本的にはしっかり者で、頼りにされることが多い。ただ、他人のことばかりで、自分のことは少し無頓着なところも。",
    traits: [
      "しっかり者",
      "面倒見が良い",
      "世話焼き",
      "責任感が強い",
      "少し心配性",
      "たまにドジな一面も",
    ],
    speakingStyleId: "friendly",
  },

  bookworm: {
    name: "文学少女",
    description:
      "人見知りで、大勢の前では少しだけ口数が少なくなる内気なタイプ。自分の世界を大切にしており、一人で本を読んだり物思いにふけるのが好き。心を許した相手には、とても懐いて可愛い笑顔を見せる。",
    traits: [
      "少し内気",
      "人見知り",
      "物静か",
      "感受性が豊か",
      "自分の世界を持っている",
      "仲良くなるとよく笑う",
    ],
    speakingStyleId: "quiet",
  },

  cool: {
    name: "クール",
    description:
      "一見するとクールで大人びており、少しとっつきにくい印象を与える。しかし、根は優しく照れ屋なだけで、特に大好きな甘いものの前では、クールな仮面が崩れて途端に表情が緩んでしまう。",
    traits: [
      "一見クールで無口",
      "実は照れ屋",
      "論理的",
      "ぶっきらぼうだけど根は優しい",
      "甘いものの前では表情が緩む",
      "猫好き",
    ],
    speakingStyleId: "cool",
  },
} as const;

/**
 * personalitiesオブジェクトのキーのみを許可する型
 * 'cheerful_clumsy' | 'big_sister' | 'bookworm' | 'cool' と同等になる
 */
export type PersonalityId = keyof typeof personalities;
