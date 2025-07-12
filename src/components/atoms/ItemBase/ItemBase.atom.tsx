import { ClickHandlerType } from "@/types";
import { cn } from "@/utils/Cn.util";
import { ElementType } from "react";

type Props<T extends ElementType = "li"> = {
  children: React.ReactNode;
  className?: string;
  onClick?: ClickHandlerType;
  as?: T;
};

export const ItemBase = <T extends ElementType = "li">({
  children,
  className,
  onClick,
  as,
}: Props<T>) => {
  const Component = as || "li";

  return (
    <Component
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
    </Component>
  );
};
