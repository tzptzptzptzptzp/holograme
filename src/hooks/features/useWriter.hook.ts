import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { useGetWriter } from "../api/useGetWriter.hook";
import { WriterState } from "@/recoil/atoms.recoil";

export const useWriter = () => {
  const [isRequestView, setIsRequestView] = useState<boolean>(false);
  const [writer, setWriter] = useRecoilState(WriterState);

  const { data: writerData } = useGetWriter();

  const handleSelectWriter = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    const closestButton = (e.target as HTMLElement).closest("button");
    if (closestButton && closestButton.id.startsWith("exclude")) return;

    const selectedWriter = writerData.find((writer) => writer.id === id);

    if (selectedWriter) {
      setWriter(selectedWriter);
    }
    setIsRequestView(true);
  };
  return {
    isRequestView,
    writer,
    writerData,
    handleSelectWriter,
    setIsRequestView,
    setWriter,
  };
};
