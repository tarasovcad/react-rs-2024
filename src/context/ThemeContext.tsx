import React from "react";
import {type ThemeContextType} from "../types/types";

export const ThemeContext = React.createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});
