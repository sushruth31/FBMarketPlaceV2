import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: null,
});

export const newListingState = atom({
  key: "newListingState",
  default: {},
});
