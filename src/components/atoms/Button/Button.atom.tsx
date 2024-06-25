import clsx from "clsx";
import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "cancel" | "disable" | "none";
};

export const Button = ({
  children,
  className,
  disabled = false,
  onClick,
  type = "button",
  variant = "none",
}: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
