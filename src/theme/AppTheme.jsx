import { useState, useEffect } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./GlobalStyles";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // A returning visitor keeps whichever palette they chose
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;

    // Everyone else lands on the blush light palette — it is the intended
    // first impression, so an OS-level dark preference does not override it.
    return "light";
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("portfolio-theme", mode);
    // Also set data-theme on <html> for any CSS variable fallbacks
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  const activeTheme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ mode, toggleTheme, isDark: mode === "dark" }}
    >
      <StyledProvider theme={activeTheme}>
        <GlobalStyles />
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
};
