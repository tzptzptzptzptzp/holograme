import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postBlogPost = async ({
  title,
  id,
  prompt,
}: {
  title: string;
  id: number;
  prompt: string;
}): Promise<{ data: { id: number; content: string; prompt: string } }> => {
  return await axios.post(`/api/writer/${id}/blog-post`, {
    title,
    prompt,
  });
};

export const usePostBlogPost = () => {
  const { mutate } = useMutation({ mutationFn: postBlogPost });
  return mutate;
};
