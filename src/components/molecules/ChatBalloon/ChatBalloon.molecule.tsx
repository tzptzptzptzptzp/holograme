import { useState } from "react";
import clsx from "clsx";
import styles from "./ChatBalloon.module.scss";
import { Button } from "@/components/atoms/Button/Button.atom";
import { CustomReactMarkdown } from "@/components/organisms/CustomReactMarkdown/CustomReactMarkdown.organism";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";

type Props = {
  message: string;
  role: "user" | "assistant";
};

export const ChatBalloon = ({ message, role }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClose = () => {
    setMenuVisible(false);
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setMenuVisible((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setMenuVisible(false);
  };
  return (
    <div
      className={clsx(styles.balloon, styles[role])}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      <div className={clsx(styles.inner, styles[role])}>
        <div
          className={clsx(
            "flex flex-col gap-4",
            message === "考え中" && styles.thinking
          )}
        >
          <CustomReactMarkdown markdown={message} />
        </div>
        {menuVisible && (
          <div className={clsx(styles.contextMenu, styles[role])}>
            <Button
              className="flex items-center font-bold"
              onClick={handleCopy}
            >
              全文コピー
              <Icons.Copy
                className="stroke-2"
                color={role === "user" ? colorConfig.text : "white"}
              />
            </Button>
            <Button
              className="hover:opacity-70"
              hover={false}
              onClick={handleClose}
            >
              <Icons.XMark
                className="absolute top-2 right-4 stroke-2"
                color={role === "user" ? colorConfig.text : "white"}
                width={28}
                height={28}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
