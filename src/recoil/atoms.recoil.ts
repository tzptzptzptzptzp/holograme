import { atom } from "recoil";
import { SelectedContentStateType } from "./types.recoil";

export const SelectedContentState = atom<SelectedContentStateType>({
  key: "SelectedContent",
  default: "home",
});
