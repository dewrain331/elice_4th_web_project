import { atom } from "recoil";

export const gallerysState = atom({
  key: "gallerysState",
  default: [],
});

export const isAddingState = atom({
  key: "isAddingStateGallery",
  default: false,
});

export const pageState = atom({
  key: "pageStateGallery",
  default: 0,
});

export const totalPageState = atom({
  key: "totalPageStateGallery",
  default: 1,
});
