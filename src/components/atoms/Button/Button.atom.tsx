import clsx from "clsx";
import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "disable" | "none";
};

export const Button = ({
  children,
  className,
  onClick,
  type = "button",
  variant = "none",
}: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
