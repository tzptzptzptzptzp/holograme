"use client";
import { useRecoilValue } from "recoil";
import { useSetData } from "@/hooks/useSetData.hook";
import { SelectedContentState } from "@/recoil/atoms.recoil";
import { ContentsSwitcher } from "@/utils/ContentsSwitcher.util";

export default function Home() {
  useSetData();
  const selectedContent = useRecoilValue(SelectedContentState);
  return ContentsSwitcher(selectedContent);
}
