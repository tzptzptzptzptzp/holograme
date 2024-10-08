import { forwardRef } from "react";
import { Input } from "@/components/atoms/Input/Input.atom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.form";
import { cn } from "@/utils/Cn.util";
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
  required?: boolean;
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
      required = false,
      type = "text",
      value,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const id = GenerateRandomID();
    return (
      <div className={cn("flex flex-col w-full", wrapperClassName)}>
        <div className="flex flex-col w-full">
          {label && (
            <label
              className={cn("flex px-1 text-[12px]", labelClassName)}
              htmlFor={id}
            >
              {label}
              {required && (
                <span className="block -translate-y-[1.5px] ml-[1px] text-red">
                  *
                </span>
              )}
            </label>
          )}
          <Input
            className={cn(
              "border-b-2 border-text bg-white bg-opacity-50",
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
