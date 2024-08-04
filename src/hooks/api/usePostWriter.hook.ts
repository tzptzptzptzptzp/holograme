import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postWriter = async ({
  name,
  expertise,
  targetAudience,
  sitePurpose,
  siteGenre,
  toneAndStyle,
}: {
  name: string;
  expertise: string;
  targetAudience: string;
  sitePurpose: string;
  siteGenre: string;
  toneAndStyle: string;
}) => {
  return await axios.post("/api/writer", {
    name,
    expertise,
    targetAudience,
    sitePurpose,
    siteGenre,
    toneAndStyle,
  });
};

export const usePostWriter = () => {
  const { mutate } = useMutation({ mutationFn: postWriter });
  return mutate;
};
