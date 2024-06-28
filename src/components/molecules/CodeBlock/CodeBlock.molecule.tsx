import { ReactNode } from "react";
import clsx from "clsx";
import Highlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { srcery } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { textsConfig } from "@/config/texts.config";
import { Icons } from "@/icons";

type Props = {
  className?: string;
  children?: ReactNode;
};

export const CodeBlock = ({ className, children }: Props) => {
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children));
    toast(textsConfig.TOAST.CLIPBOARD_SAVE.SUCCESS);
  };
  return match ? (
    <>
      <div className="flex justify-between px-2 py-[2px] rounded-t-md bg-white text-text">
        <p>{lang}</p>
        <Button onClick={handleCopy}>
          <Icons.Copy width={20} height={20} />
        </Button>
      </div>
      <Highlighter style={srcery} language={lang}>
        {String(children).replace(/\n$/, "")}
      </Highlighter>
    </>
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
