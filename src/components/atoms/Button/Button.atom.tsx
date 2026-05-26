import styles from "./Button.module.scss";
import { ClickHandlerType } from "@/types";
import { cn } from "@/utils/Cn.util";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  hover?: boolean;
  id?: string;
  onClick?: ClickHandlerType;
  size?: "sm" | "md" | "lg";
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
  size = "sm",
  type = "button",
  variant = "none",
}: Props) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        variant !== "none" && styles[size],
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
