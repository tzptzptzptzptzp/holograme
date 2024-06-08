import { forwardRef } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, placeholder, type = "text", ...props }, ref) => {
    return (
      <input
        className={clsx("w-full py-[2px] px-1 focus:outline-none", className)}
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
