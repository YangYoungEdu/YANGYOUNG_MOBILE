import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist();

export const loginCheck = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const studentIdState = atom({
  key: "studentIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const serialNumberState = atom({
  key: "serialNumberState",
  default: "",
});