import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putWriter = async ({
  id,
  name,
  expertise,
  targetAudience,
  sitePurpose,
  siteGenre,
  toneAndStyle,
}: {
  id: number;
  name: string;
  expertise: string;
  targetAudience: string;
  sitePurpose: string;
  siteGenre: string;
  toneAndStyle: string;
}) => {
  return await axios.put(`/api/writer/${id}`, {
    name,
    expertise,
    targetAudience,
    sitePurpose,
    siteGenre,
    toneAndStyle,
  });
};

export const usePutWriter = () => {
  const { mutate } = useMutation({ mutationFn: putWriter });
  return mutate;
};
