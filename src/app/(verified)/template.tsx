import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";

export default function VerifiedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalFrame>{children}</GlobalFrame>;
}
