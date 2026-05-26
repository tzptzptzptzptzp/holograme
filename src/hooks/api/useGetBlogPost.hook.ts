import axios from "axios";
import { useEffect } from "react";
import { BlogPost } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useBlogPost } from "@/hooks/features/useBlogPost.hook";
import { useSessionStore } from "@/stores/session.store";

const getBlogPost = async (id: number) => {
  if (!axios.defaults.headers.common["Authorization"] || id === 0) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<BlogPost[]>(`/api/writer/${id}/blog-post`);
  return res.data;
};

export const useGetBlogPost = (id: number) => {
  const { setCurrentBlogPost } = useBlogPost();
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_BLOG_POST, id],
    queryFn: () => getBlogPost(id),
    enabled: !!session && id !== 0,
    staleTime: GetMinutesToMilliseconds(5),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data && queryResult.data.length > 0) {
      // 配列の最初のブログポストを現在のブログポストとして設定
      setCurrentBlogPost(queryResult.data[0]);
    }
  }, [queryResult.data, setCurrentBlogPost]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
