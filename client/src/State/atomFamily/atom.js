import { atom } from "recoil";

export const usernameState = atom({
  key: "username",
  default: "",
});

export const DarkThemeState = atom({
  key: "DarkTheme",
  default: false,
});
