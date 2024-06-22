import clsx from "clsx";
import styles from "./ChatBalloon.module.scss";
import { CustomReactMarkdown } from "@/components/organisms/CustomReactMarkdown/CustomReactMarkdown.organism";

type Props = {
  message: string;
  role: "user" | "assistant";
};

export const ChatBalloon = ({ message, role }: Props) => {
  return (
    <div className={clsx(styles.balloon, styles[role])}>
      <div className={clsx(styles.inner, styles[role])}>
        <div className={clsx(message === "考え中" && styles.thinking)}>
          <CustomReactMarkdown markdown={message} />
        </div>
      </div>
    </div>
  );
};
