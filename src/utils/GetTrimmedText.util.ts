export const getTrimmedText = (text: string, limit: number = 15): string => {
  return text.length >= limit ? `${text.slice(0, limit)}...` : text;
};
