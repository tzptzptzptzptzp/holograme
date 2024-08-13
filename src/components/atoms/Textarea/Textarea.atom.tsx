import { forwardRef } from "react";
import { cn } from "@/utils/Cn.util";

type TextareaProps = {
  className?: string;
  cols?: number;
  disabled?: boolean;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      cols,
      disabled = false,
      id,
      onBlur,
      onChange,
      onInput,
      onKeyDown,
      placeholder,
      rows = 3,
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        className={cn(
          "w-full max-h-80 py-[2px] px-1 focus:outline-none disabled:bg-disableBackground disabled:text-disableText resize-none",
          className
        )}
        cols={cols}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onInput={onInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        ref={ref}
        rows={rows}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
