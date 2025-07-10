export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center relative w-full min-w-[600px] s:min-w-0 h-full s:p-4">
      {children}
    </div>
  );
}
