import { forwardRef, ChangeEvent } from "react";
import clsx from "clsx";

type TextareaProps = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  cols?: number;
  value?: string;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: () => void;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      disabled = false,
      onBlur,
      onChange,
      onInput,
      placeholder,
      rows = 3,
      cols,
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        className={clsx(
          "w-full max-h-80 py-[2px] px-1 focus:outline-none disabled:bg-disableBackground disabled:text-disableText resize-none",
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onBlur={onBlur}
        onChange={onChange}
        onInput={onInput}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
