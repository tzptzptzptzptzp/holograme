export const CircleContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center relative z-0 w-[50vh] min-w-[450px] h-[50vh] min-h-[450px]">
      <div className="absolute top-0 right-0 bottom-0 left-0 z-[-1] bg-white bg-opacity-60 rounded-full shadow-md blur"></div>
      {children}
    </div>
  );
};
