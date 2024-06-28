import { forwardRef } from "react";
import clsx from "clsx";

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
      ...props
    },
    ref
  ) => {
    return (
      <input
        className={clsx(
          "w-full py-[2px] px-1 focus:outline-none disabled:bg-disableBackground disabled:text-disableText",
          className
        )}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
