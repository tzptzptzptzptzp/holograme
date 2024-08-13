import { useRecoilState } from "recoil";
import { CurrentBlogPostState } from "@/recoil/atoms.recoil";

export const useBlogPost = () => {
  const [currentBlogPost, setCurrentBlogPost] =
    useRecoilState(CurrentBlogPostState);
  return { currentBlogPost, setCurrentBlogPost };
};
