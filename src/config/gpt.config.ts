export const gptConfig = {
  MODEL: {
    DEFAULT:
      process.env.NODE_ENV === "production"
        ? "gpt-4o-2024-08-06"
        : "gpt-4o-mini",
    LITE: "gpt-4o-mini",
  },
  MAX_TOKENS: {
    DEFAULT: 3000,
    WRITING: 6000,
  },
};
