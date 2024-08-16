export const gptConfig = {
  MODEL:
    process.env.NODE_ENV === "production" ? "chatgpt-4o-latest" : "gpt-4o-mini",
  MAX_TOKENS: 2500,
};
