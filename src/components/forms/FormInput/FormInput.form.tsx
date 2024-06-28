import { forwardRef } from "react";
import clsx from "clsx";
import { Input } from "@/components/atoms/Input/Input.atom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.form";
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
      ...props
    },
    ref
  ) => {
    const id = GenerateRandomID();
    return (
      <div className="flex flex-col">
        <div className="flex flex-col">
          {label && (
            <label
              className={clsx("px-1 text-[12px]", labelClassName)}
              htmlFor={id}
            >
              {label}
            </label>
          )}
          <Input
            className={clsx(
              "min-w-[250px] border-b-2 border-text bg-white bg-opacity-50",
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
