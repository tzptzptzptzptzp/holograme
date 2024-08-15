import axios from "axios";
import { BlogPost } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const defaultValue: BlogPost[] = [
  {
    id: 0,
    userId: "",
    writerId: 0,
    title: "",
    prompt: "",
    content: "",
    createdDate: new Date(),
    updatedDate: new Date(),
  },
];

const getBlogPost = async (id: number) => {
  if (!axios.defaults.headers.common["Authorization"] || id === 0) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<BlogPost[]>(`/api/writer/${id}/blog-post`);
  return res.data;
};

export const useGetBlogPost = (id: number) => {
  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_BLOG_POST, id],
    queryFn: () => getBlogPost(id),
    enabled: !!axios.defaults.headers.common["Authorization"] && id !== 0,
    staleTime: GetMinutesToMilliseconds(5),
    placeholderData: defaultValue,
  });

  return {
    ...queryResult,
    data: queryResult.data ?? defaultValue,
  };
};
