import ReactMarkdown from "react-markdown";
import { CodeBlock } from "@/components/molecules/CodeBlock/CodeBlock.molecule";

export const CustomReactMarkdown = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
        p: ({ children }) => <div>{children}</div>,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
