import React from "react";
import ThemeItem from "./ThemeItem";

const THEMES = [
  { primaryColor: "deepskyblue", secondaryColor: "coral" },
  { primaryColor: "orchid", secondaryColor: "mediumseagreen" },
];
export default function ChangeTheme({ theme, setTheme }) {
  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }
  return (
    <div>
      Change theme:
      {THEMES.map((t, i) => (
        <ThemeItem
          key={"theme-" + i}
          theme={t}
          active={isActive(t)}
          onClick={() => setTheme(t)}
        />
      ))}{" "}
    </div>
  );
}
