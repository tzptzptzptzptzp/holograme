import { ReactNode } from "react";
import clsx from "clsx";
import Highlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { srcery } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = {
  className?: string;
  children?: ReactNode;
};

export const CodeBlock = ({ className, children }: Props) => {
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return match ? (
    <Highlighter style={srcery} language={lang}>
      {String(children).replace(/\n$/, "")}
    </Highlighter>
  ) : (
    <code
      className={clsx(
        "inline-block mx-[3px] px-1 py-[2px] border border-white rounded bg-white bg-opacity-80 text-text text-[15px] leading-none whitespace-pre-wrap",
        className
      )}
      style={{ transform: "translateY(-1.5px)" }}
    >
      {children}
    </code>
  );
};
