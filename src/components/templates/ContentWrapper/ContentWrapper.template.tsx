export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-3 overflow-x-visible overflow-y-scroll w-full h-full pt-16 pb-10">
      {children}
    </div>
  );
};
