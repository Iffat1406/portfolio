import { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./GlobalStyles";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;

    // 2. Fall back to OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("portfolio-theme", mode);
    // Also set data-theme on <html> for any CSS variable fallbacks
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // Listen to OS preference changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem("portfolio-theme")) {
        setMode(e.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

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
