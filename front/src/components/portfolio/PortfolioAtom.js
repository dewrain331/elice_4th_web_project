import { atom } from "recoil";

export const pageState = atom({
  key: "pageStatePortfolio",
  default: 1,
});

export const allPageState = atom({
  key: "allPageStatePortfolio",
  default: 0,
});
