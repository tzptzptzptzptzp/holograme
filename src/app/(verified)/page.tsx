"use client";
import { useSelectedContent } from "@/hooks/useSelectedContent.hook";
import { ContentsSwitcher } from "@/utils/ContentsSwitcher.util";

export default function Home() {
  const { selectedContent } = useSelectedContent();
  return ContentsSwitcher(selectedContent);
}
