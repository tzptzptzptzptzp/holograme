import clsx from "clsx";
import styles from "./Button.module.scss";
import { ClickHandlerType } from "@/types";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  hover?: boolean;
  id?: string;
  onClick?: ClickHandlerType;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "cancel" | "disable" | "none";
};

export const Button = ({
  children,
  className,
  disabled = false,
  hover = true,
  id,
  onClick,
  type = "button",
  variant = "none",
}: Props) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        hover && styles.hover,
        className
      )}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
