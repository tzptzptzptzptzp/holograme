import { cn } from "@/utils/Cn.util";

type Props = { children: React.ReactNode; className?: string };

export const ContentWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "a-fade-in flex flex-col gap-3 s:gap-2 overflow-x-visible overflow-y-scroll w-full h-full pt-16 pb-10 s:p-0",
        className
      )}
    >
      {children}
    </div>
  );
};
