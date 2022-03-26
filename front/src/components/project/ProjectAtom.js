import { atom } from "recoil";

export const projectsState = atom({
  key: "projectsState",
  default: [],
});

export const isAddingState = atom({
  key: "isAddingStateProject",
  default: false,
});

export const pageState = atom({
  key: "pageStateProject",
  default: 0,
});

export const totalPageState = atom({
  key: "totalPageStateProject",
  default: 1,
});
