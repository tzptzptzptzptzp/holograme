"use client";
import { usePathname } from "next/navigation";
import { GlobalFrame } from "@/components/templates/GlobalFrame/GlobalFrame.template";

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return <GlobalFrame contents={path === "/"}>{children}</GlobalFrame>;
}
