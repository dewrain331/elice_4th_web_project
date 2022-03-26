import { atom } from "recoil";

export const EducationsState = atom({
  key: "Educations",
  default: [],
});

export const isAddingState = atom({
  key: "isAddingStateEducation",
  default: false,
});

export const pageState = atom({
  key: "pageStateEducation",
  default: 1,
});

export const allPageState = atom({
  key: "allPageStateEducation",
  default: 0,
});
