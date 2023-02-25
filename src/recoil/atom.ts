import { atom } from "recoil";

export const getTokenAtom = () => {
  return atom({
    key: "token",
    default: "",
  });
};
