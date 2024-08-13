import { forwardRef } from "react";
import { Select } from "@/components/atoms/Select/Select.atom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.form";
import { cn } from "@/utils/Cn.util";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";

type Option = {
  id: number;
  name: string;
};

type Props = {
  disabled?: boolean;
  errorMessage?: string;
  selectClassName?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  value?: string;
  wrapperClassName?: string;
};

const FormSelect = forwardRef<HTMLSelectElement, Props>(
  (
    {
      disabled = false,
      errorMessage,
      selectClassName,
      label,
      labelClassName,
      onChange,
      options,
      placeholder,
      required = false,
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
              className={cn("flex px-1 text-[12px]", labelClassName)}
              htmlFor={id}
            >
              {label}
              {required && (
                <span className="block -translate-y-[1.5px] ml-[1px] text-red">
                  *
                </span>
              )}{" "}
            </label>
          )}
          <Select
            className={cn(
              "max-w-none min-w-[390px] s:min-w-0 py-[2px] px-1 border-b-2 border-text bg-white bg-opacity-50 text-left",
              selectClassName
            )}
            disabled={disabled}
            id={id}
            onChange={onChange}
            options={options}
            ref={ref}
            value={value}
            {...props}
          />
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export { FormSelect };
