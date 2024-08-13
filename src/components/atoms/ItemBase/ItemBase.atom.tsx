import { ClickHandlerType } from "@/types";
import { cn } from "@/utils/Cn.util";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: ClickHandlerType;
};

export const ItemBase = ({ children, className, onClick }: Props) => {
  return (
    <li
      className={cn(
        "flex items-center w-full min-w-0 min-h-[45px] px-4 py-2 relative z-0 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 duration-300",
        className
      )}
    >
      <button
        className="flex items-center justify-between gap-1 w-full cursor-default"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
