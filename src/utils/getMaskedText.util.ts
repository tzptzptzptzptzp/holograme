export const getMaskedText = (text: string, limit: number = 5): string => {
  if (text.length <= limit) return text;

  const maskedPortion = "*".repeat(text.length - limit);
  return text.slice(0, limit) + maskedPortion;
};
