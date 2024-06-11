import { atom } from "recoil";
import { SearchTypeStateType, SelectedContentStateType } from "./types.recoil";

export const InitializeState = atom<boolean>({
  key: "Initialize",
  default: false,
});

export const SelectedContentState = atom<SelectedContentStateType>({
  key: "SelectedContent",
  default: "home",
});

export const SearchTypeState = atom<SearchTypeStateType>({
  key: "SearchType",
  default: "currentTab",
});
