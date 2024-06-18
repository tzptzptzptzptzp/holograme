import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ContentHead = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-[6px] w-full pl-4 pr-3 py-2 rounded-full bg-primary text-white text-[20px] font-bold",
        className
      )}
    >
      {children}
    </div>
  );
};
