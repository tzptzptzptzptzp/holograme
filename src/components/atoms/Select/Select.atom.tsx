import { cn } from "@/utils/cn.util";

type Option = {
  id: number;
  name: string;
};

type Props = {
  className?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  value?: string | number;
};

export const Select = ({ className, id, onChange, options, value }: Props) => {
  return (
    <select
      className={cn(
        "w-full max-w-fit text-right truncate focus-visible:outline-none",
        className
      )}
      id={id}
      name={id}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
