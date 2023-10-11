import { createContext } from "react";

export const ThemeContext = createContext({
  primaryColor: "deepskyblue",
  secondaryColor: "coral",
});

export const StateContext = createContext({
  state: {},
  dispatch: () => {},
});
