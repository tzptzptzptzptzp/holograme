import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  className,
  onClick,
  type = "button",
}: Props) => {
  return (
    <button className={clsx(className)} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
