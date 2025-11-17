import { MouseEvent, useState } from "react";
import { useWriterStore } from "@/stores/writer.store";

export const useWriter = () => {
  const [isRequestView, setIsRequestView] = useState<boolean>(false);
  const { writer, writers, setWriter, setWriters, resetWriter } =
    useWriterStore();

  const handleSelectWriter = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    const closestButton = (e.target as HTMLElement).closest("button");
    if (closestButton && closestButton.id.startsWith("exclude")) return;
    setFindWriter(id);
    setIsRequestView(true);
  };

  const setFindWriter = (id: number) => {
    const selectedWriter = writers.find((writer) => writer.id === id);
    if (selectedWriter) {
      setWriter(selectedWriter);
    }
  };
  return {
    isRequestView,
    writer,
    writers,
    handleSelectWriter,
    resetWriter,
    setFindWriter,
    setIsRequestView,
    setWriter,
    setWriters,
  };
};
