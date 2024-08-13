import { cn } from "@/utils/Cn.util";

type Props = {
  className?: string;
};

export const Border = ({ className }: Props) => {
  return (
    <hr
      className={cn(
        "w-full h-[2px] my-1 bg-primary bg-opacity-30 border-none",
        className
      )}
    />
  );
};
