import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const isDarkmode = window.matchMedia("(prefers-color-scheme:dark)").matches;
const SystemDefault = isDarkmode ? "dark" : "light";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || SystemDefault;
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    const CurrentTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", CurrentTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
