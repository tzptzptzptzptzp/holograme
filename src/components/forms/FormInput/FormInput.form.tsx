import { Input } from "@/components/atoms/Input/Input.atom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.form";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";
import { forwardRef } from "react";

type Props = {
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email";
};

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      disabled = false,
      errorMessage,
      label,
      onBlur,
      onChange,
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
          <label className="px-1 text-[12px]" htmlFor={id}>
            {label}
          </label>
          <Input
            className="min-w-[250px] border-b-2 border-text bg-white bg-opacity-50"
            disabled={disabled}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
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
