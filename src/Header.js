import React from "react";

import { useContext } from "react";
import { ThemeContext } from "./contexts";
const Header = ({ text }) => {
  //   <ThemeContext.Consumer>
  //     {(theme) => <h1 style={{ color: theme.primary }}>{text}</h1>}
  //   </ThemeContext.Consumer>
  const { primaryColor } = useContext(ThemeContext);
  return <h1 style={{ color: primaryColor }}>{text}</h1>;
};
export default Header;
