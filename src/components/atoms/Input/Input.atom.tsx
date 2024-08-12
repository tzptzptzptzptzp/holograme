import { forwardRef } from "react";
import { cn } from "@/utils/cn.util";

type Props = {
  className?: string;
  disabled?: boolean;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email";
  value?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      disabled = false,
      id,
      onBlur,
      onChange,
      placeholder,
      type = "text",
      value,
      ...props
    },
    ref
  ) => {
    return (
      <input
        className={cn(
          "w-full py-[2px] px-1 focus:outline-none disabled:bg-disableBackground disabled:text-disableText",
          className
        )}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
