import { atom } from "recoil";

export const getTokenAtom = () => {
  return atom({
    key: "token",
    default: "",
  });
};

export const getCurrentUserAtom = () => {
  return atom({
    key: "currentUser",
    default: {},
  });
};
