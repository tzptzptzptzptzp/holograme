import clsx from "clsx";
import styles from "./ChatBalloon.module.scss";

type Props = {
  message: string;
  role: "user" | "assistant";
};

export const ChatBalloon = ({ message, role }: Props) => {
  return (
    <div className={clsx(styles.balloon, styles[role])}>
      <div className={clsx(styles.inner, styles[role])}>
        <div className={clsx(message === "考え中" && styles.thinking)}>
          {message}
        </div>
      </div>
    </div>
  );
};
