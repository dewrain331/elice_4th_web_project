import { atom } from "recoil";

export const gallerysState = atom({
  key: "gallerysState",
  default: [],
});

export const isAddingState = atom({
  key: "isAddingStateGallery",
  default: false,
});
