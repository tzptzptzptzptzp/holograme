import { forwardRef } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "password" | "email";
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { className, disabled = false, placeholder, type = "text", ...props },
    ref
  ) => {
    return (
      <input
        className={clsx(
          "w-full py-[2px] px-1 focus:outline-none disabled:bg-disableBackground disabled:text-disableText",
          className
        )}
        disabled={disabled}
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
