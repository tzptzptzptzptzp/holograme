import { atom } from "recoil";
import { Session } from "@supabase/supabase-js";
import { SearchTypeStateType, SelectedContentStateType } from "./types.recoil";

export const InitializeState = atom<boolean>({
  key: "Initialize",
  default: false,
});

export const SessionState = atom<Session | null>({
  key: "Session",
  default: null,
});

export const SelectedContentState = atom<SelectedContentStateType>({
  key: "SelectedContent",
  default: "home",
});

export const SearchTypeState = atom<SearchTypeStateType>({
  key: "SearchType",
  default: "currentTab",
});
