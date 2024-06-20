import clsx from "clsx";

type Props = { children: React.ReactNode; className?: string };

export const ContentWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3 overflow-x-visible overflow-y-scroll w-full h-full pt-16 pb-10",
        className
      )}
    >
      {children}
    </div>
  );
};
