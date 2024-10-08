type Props = {
  children: React.ReactNode;
};

export const ErrorMessage = ({ children }: Props) => {
  return <p className="mt-1 px-1 text-red text-[12px] font-bold">{children}</p>;
};
