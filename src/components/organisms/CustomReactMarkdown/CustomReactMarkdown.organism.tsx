import ReactMarkdown from "react-markdown";
import { CodeBlock } from "@/components/molecules/CodeBlock/CodeBlock.molecule";
import { cn } from "@/utils/Cn.util";

export const CustomReactMarkdown = ({
  className,
  markdown,
}: {
  className?: string;
  markdown: string;
}) => {
  return (
    <ReactMarkdown
      className={cn("flex flex-col gap-2 leading-[1.8]", className)}
      components={{
        code: CodeBlock,
        h1: ({ children }) => (
          <h1 className="text-[1.4em] font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[1.3em] font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[1.2em] font-semibold">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-[1.1em] font-semibold">{children}</h4>
        ),
        ul: ({ children }) => (
          <ul className="flex flex-col gap-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="flex flex-col gap-4">{children}</ol>
        ),
        li: ({ children }) => <li className="pl-2">{children}</li>,
        p: ({ children }) => (
          <div className="max-w-full break-words">{children}</div>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
