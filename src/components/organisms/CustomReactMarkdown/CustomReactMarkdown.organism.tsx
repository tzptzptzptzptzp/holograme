import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
      remarkPlugins={[remarkGfm]}
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
          <ul className="flex flex-col gap-1 list-disc list-outside ml-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="flex flex-col gap-1 list-decimal list-outside ml-2">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="ml-4 marker:text-current">{children}</li>
        ),
        p: ({ children }) => (
          <div className="max-w-full break-words">{children}</div>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto w-full">
            <table className="border-collapse table-fixed w-max min-w-full">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="border-2">{children}</thead>,
        tbody: ({ children }) => <tbody className="border-2">{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => <th className="px-2 py-1 border">{children}</th>,
        td: ({ children }) => <td className="px-2 py-1 border">{children}</td>,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
