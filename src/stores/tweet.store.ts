import { create } from "zustand";

type TweetStoreType = {
  tweet: string;
  setTweet: (tweet: string) => void;
};

export const useTweetStore = create<TweetStoreType>()((set) => ({
  tweet: "",
  setTweet: (tweet) => set({ tweet }),
}));
