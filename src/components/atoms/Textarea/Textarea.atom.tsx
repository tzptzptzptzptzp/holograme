import { forwardRef } from "react";
import clsx from "clsx";

type TextareaProps = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  resize?: boolean;
  rows?: number;
  cols?: number;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      disabled = false,
      placeholder,
      resize = false,
      rows = 1,
      cols,
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        className={clsx(
          "w-full py-[2px] px-1 focus:outline-none disabled:bg-disableBackground disabled:text-disableText",
          className,
          resize ? "resize" : "resize-none"
        )}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
