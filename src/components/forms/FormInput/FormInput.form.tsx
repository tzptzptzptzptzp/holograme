import { forwardRef } from "react";
import { Input } from "@/components/atoms/Input/Input.atom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.form";
import { cn } from "@/utils/cn.util";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";

type Props = {
  disabled?: boolean;
  errorMessage?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email";
  value?: string;
  wrapperClassName?: string;
};

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      disabled = false,
      errorMessage,
      inputClassName,
      label,
      labelClassName,
      onBlur,
      onChange,
      onInput,
      onKeyDown,
      placeholder,
      type = "text",
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
          <Input
            className={cn(
              "min-w-[390px] s:min-w-0 border-b-2 border-text bg-white bg-opacity-50",
              inputClassName
            )}
            disabled={disabled}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            onInput={onInput}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
            type={type}
            value={value}
            {...props}
          />
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
