import { MouseEvent, useState } from "react";
import { Writer } from "@prisma/client";
import { useGetWriter } from "../api/useGetWriter.hook";

const writerDefaultValue = {
  id: 0,
  userId: "",
  name: "",
  expertise: "",
  targetAudience: "",
  sitePurpose: "",
  siteGenre: "",
  toneAndStyle: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const useWriter = () => {
  const [isRequestView, setIsRequestView] = useState<boolean>(false);
  const [writer, setWriter] = useState<Writer>(writerDefaultValue);

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
