export const gptConfig = {
  MODEL:
    process.env.NODE_ENV === "production" ? "gpt-4o-2024-08-06" : "gpt-4o-mini",
  MAX_TOKENS: 2500,
};
