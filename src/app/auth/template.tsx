import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalFrame contents={false} shadow={false}>
      {children}
    </GlobalFrame>
  );
}
