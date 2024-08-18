export const gptConfig = {
  MODEL: {
    DEFAULT:
      process.env.NODE_ENV === "production"
        ? "chatgpt-4o-latest"
        : "gpt-4o-mini",
    LITE: "gpt-4o-mini",
  },
  MAX_TOKENS: {
    DEFAULT: 3000,
    WRITING: 6000,
  },
};
