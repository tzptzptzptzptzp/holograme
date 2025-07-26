export const gptConfig = {
  MODEL: {
    DEFAULT:
      process.env.NODE_ENV === "production"
        ? "gpt-4o-2024-08-06"
        : "gpt-4.1-nano",
    REASONING: "o4-mini",
    LITE: "gpt-4.1-nano",
  },
  MAX_TOKENS: {
    DEFAULT: 3000,
    WRITING: 6000,
  },
};
