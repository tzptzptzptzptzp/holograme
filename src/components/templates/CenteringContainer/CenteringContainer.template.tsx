import clsx from "clsx";

type Props = { children: React.ReactNode; className?: string };

export const CenteringContainer = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
};
