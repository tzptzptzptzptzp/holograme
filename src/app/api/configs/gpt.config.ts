const LITE = "gpt-5.4-nano";

export const gptConfig = {
  MODEL: {
    DEFAULT: process.env.NODE_ENV === "production" ? "gpt-4.1" : LITE,
    REASONING: "o4-mini",
    LITE,
  },
  MAX_TOKENS: {
    DEFAULT: 3000,
    WRITING: 6000,
  },
};
