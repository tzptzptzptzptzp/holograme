import { cn } from "@/utils/Cn.util";

type Props = { children: React.ReactNode; className?: string };

export const CenteringContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
};
