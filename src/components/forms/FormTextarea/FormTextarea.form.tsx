import { forwardRef } from "react";
import { Textarea } from "@/components/atoms/Textarea/Textarea.atom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.form";
import { cn } from "@/utils/cn.util";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";

type Props = {
  cols?: number;
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  labelClassName?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  textareaClassName?: string;
  value?: string;
  wrapperClassName?: string;
};

const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      cols,
      disabled = false,
      errorMessage,
      label,
      labelClassName,
      onBlur,
      onChange,
      onInput,
      onKeyDown,
      placeholder,
      required = false,
      rows = 3,
      textareaClassName,
      value,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const id = GenerateRandomID();
    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        <div className="flex flex-col">
          {label && (
            <label
              className={cn("px-1 text-[12px]", labelClassName)}
              htmlFor={id}
            >
              {label}
            </label>
          )}
          <Textarea
            className={cn(
              "min-w-[390px] s:min-w-0 border-b-2 border-text bg-white bg-opacity-50",
              textareaClassName
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
            required={required}
            rows={rows}
            value={value}
            {...props}
          />
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };
