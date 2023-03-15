import { atom } from "recoil";
import { User } from "../pages/user/components/userTable";
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
    default: [],
  });
};

export const getUserListAtom = () => {
  return atom<User[]>({
    key: "userDataSource",
    default: [],
  });
};
