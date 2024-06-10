"use client";
import { useRecoilValue } from "recoil";
import { SelectedContentState } from "@/recoil/atoms.recoil";
import { ContentsSwitcher } from "@/utils/ContentsSwitcher.util";

export default function Home() {
  const selectedContent = useRecoilValue(SelectedContentState);
  return ContentsSwitcher(selectedContent);
}
