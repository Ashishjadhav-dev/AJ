"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme?: Theme;
  toggleTheme: () => void;
}>({ toggleTheme: () => {} });

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>();
  const applyTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    setTheme(next);
  };

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
    const onStorage = (event: StorageEvent) => {
      if (event.key === "portfolio-theme" || event.key === null) update();
    };
    update();
    preference.addEventListener("change", update);
    window.addEventListener("storage", onStorage);
    return () => {
      preference.removeEventListener("change", update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggleTheme = () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
