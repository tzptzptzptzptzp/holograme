import { cn } from "@/utils/cn.util";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ContentHead = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-[6px] w-full s:h-[46px] pl-4 pr-3 py-2 rounded-full bg-primary text-white text-[20px] s:text-[18px] font-bold",
        className
      )}
    >
      {children}
    </div>
  );
};
