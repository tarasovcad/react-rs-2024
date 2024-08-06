import React, {ReactNode, useCallback, useState} from "react";
import {ThemeContext} from "./ThemeContext";

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => {
      console.log("Toggling theme. New mode:", !prevMode);
      return !prevMode;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
