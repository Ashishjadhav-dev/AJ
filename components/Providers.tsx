"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function changeTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // The current page still reflects the selected theme.
  }
}

const ThemeContext = createContext({ changeTheme });

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      let saved = null;
      try {
        saved = localStorage.getItem("portfolio-theme");
      } catch {}
      applyTheme(
        saved === "light" || saved === "dark"
          ? saved
          : preference.matches
            ? "dark"
            : "light",
      );
    };
    update();
    preference.addEventListener("change", update);
    window.addEventListener("storage", update);
    return () => {
      preference.removeEventListener("change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
