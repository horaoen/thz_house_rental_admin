import { atom } from "recoil";
import { House } from "../request/type";

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

export const getHouseListAtom = () => {
  return atom<House[]>({
    key: "houseDataSource",
    default: []
  });
};
