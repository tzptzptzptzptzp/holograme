import { create } from "zustand";
import { persist } from "zustand/middleware";

// CurrentBlogPostStateTypeと同等の型定義
export interface CurrentBlogPostState {
  id: number;
  title: string;
  content: string;
  prompt: string;
}

// デフォルト値
const defaultValue: CurrentBlogPostState = {
  id: 0,
  title: "",
  content: "",
  prompt: "",
};

// ストアの型定義
interface CurrentBlogPostStore {
  currentBlogPost: CurrentBlogPostState;
  setCurrentBlogPost: (blogPost: CurrentBlogPostState) => void;
  resetBlogPost: () => void;
}

// Zustandストアの作成
export const useCurrentBlogPostStore = create<CurrentBlogPostStore>()(
  persist(
    (set) => ({
      currentBlogPost: defaultValue,
      setCurrentBlogPost: (blogPost) => set({ currentBlogPost: blogPost }),
      resetBlogPost: () => set({ currentBlogPost: defaultValue }),
    }),
    {
      name: "current-blog-post-storage", // localStorage用のキー名
    }
  )
);
