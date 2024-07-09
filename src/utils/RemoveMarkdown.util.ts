export const RemoveMarkdown = (markdownText: string): string => {
  return markdownText
    .replace(/```/g, "") // Remove escaped backticks
    .replace(/\\`/g, "") // Remove escaped backticks
    .replace(/`([^`]+)`/g, "$1") // Remove inline code backticks but keep text
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links but keep text
    .replace(/([*_]{1,2})(.*?)\1/g, "$2") // Remove bold and italic
    .replace(/~~(.*?)~~/g, "$1") // Remove strikethrough
    .replace(/^[#]+ /gm, "") // Remove headers
    .replace(/>\s/g, "") // Remove blockquotes
    .replace(/[-+*] /g, "") // Remove unordered list items
    .replace(/\d+\.\s/g, "") // Remove ordered list items
    .replace(/---/g, "") // Remove horizontal rules
    .replace(/\n{2,}/g, "\n") // Reduce multiple newlines to a single newline
    .trim();
};
