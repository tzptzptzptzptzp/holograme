import { MouseEvent, useState } from "react";

type WriterType = {
  id: number;
};

const writerDefaultValue: WriterType = {
  id: 0,
};

export const useWriter = () => {
  const [isRequestView, setIsRequestView] = useState<boolean>(false);
  const [writer, setWriter] = useState<WriterType>(writerDefaultValue);

  const handleSelectWriter = (e: MouseEvent<HTMLLIElement>, id: number) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setWriter({ id });
    setIsRequestView(true);
  };
  return {
    isRequestView,
    writer,
    handleSelectWriter,
    setIsRequestView,
    setWriter,
  };
};
