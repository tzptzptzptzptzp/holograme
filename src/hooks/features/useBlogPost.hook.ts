import { useRecoilState, useResetRecoilState } from "recoil";
import { CurrentBlogPostState } from "@/recoil/atoms.recoil";

export const useBlogPost = () => {
  const [currentBlogPost, setCurrentBlogPost] =
    useRecoilState(CurrentBlogPostState);
  const resetBlogPost = useResetRecoilState(CurrentBlogPostState);
  return { currentBlogPost, resetBlogPost, setCurrentBlogPost };
};
