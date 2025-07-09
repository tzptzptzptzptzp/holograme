import { useCurrentBlogPostStore } from "@/stores/currentBlogPost.store";

export const useBlogPost = () => {
  const { currentBlogPost, setCurrentBlogPost, resetBlogPost } =
    useCurrentBlogPostStore();

  return { currentBlogPost, resetBlogPost, setCurrentBlogPost };
};
