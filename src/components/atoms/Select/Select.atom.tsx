import { forwardRef } from "react";
import { cn } from "@/utils/cn.util";

type Option = {
  id: number;
  name: string;
};

type Props = {
  className?: string;
  disabled?: boolean;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  value?: string | number;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, disabled, id, onChange, options, value }, ref) => {
    return (
      <select
        className={cn(
          "w-full max-w-fit text-right truncate focus-visible:outline-none",
          className
        )}
        disabled={disabled}
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        ref={ref}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
