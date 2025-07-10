import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";

export default function Template({ children }: { children: React.ReactNode }) {
  return <GlobalFrame>{children}</GlobalFrame>;
}
