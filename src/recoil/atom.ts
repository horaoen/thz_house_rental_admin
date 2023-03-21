import { atom } from "recoil";

export const getTokenAtom = () => {
  return atom({
    key: "token",
    default: "",
  });
};

export const getReservationListAtom = () => {
  return atom<any[]>({
    key: "reservationDataSource",
    default: [],
  })
}
