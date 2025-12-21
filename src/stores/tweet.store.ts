import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

type TweetStoreType = {
  tweet: string;
  setTweet: (tweet: string) => void;
};

export const useTweetStore = create<TweetStoreType>()(
  persist(
    (set) => ({
      tweet: "",
      setTweet: (tweet) => set({ tweet }),
    }),
    {
      name: STORAGE_KEYS.TWEET,
      partialize: (state) => ({ tweet: state.tweet }),
    }
  )
);
