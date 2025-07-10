import { MouseEvent, useState } from "react";
import { useGetWriter } from "../api/useGetWriter.hook";
import { useWriterStore } from "@/stores/writer.store";

export const useWriter = () => {
  const [isRequestView, setIsRequestView] = useState<boolean>(false);
  const writer = useWriterStore((state) => state.writer);
  const setWriter = useWriterStore((state) => state.setWriter);
  const resetWriter = useWriterStore((state) => state.resetWriter);

  const { data: writerData } = useGetWriter();

  const handleSelectWriter = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    const closestButton = (e.target as HTMLElement).closest("button");
    if (closestButton && closestButton.id.startsWith("exclude")) return;
    setFindWriter(id);
    setIsRequestView(true);
  };

  const setFindWriter = (id: number) => {
    const selectedWriter = writerData.find((writer) => writer.id === id);
    if (selectedWriter) {
      setWriter(selectedWriter);
    }
  };
  return {
    isRequestView,
    writer,
    writerData,
    handleSelectWriter,
    resetWriter,
    setFindWriter,
    setIsRequestView,
    setWriter,
  };
};
