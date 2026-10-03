"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { resolvedTheme: Theme; setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);
const listeners = new Set<() => void>();
let currentTheme: Theme = "light";
let initialized = false;

function preferredTheme(): Theme {
  const saved = window.localStorage.getItem("portfolio-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function publish(theme: Theme) {
  currentTheme = theme;
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!initialized) {
    initialized = true;
    queueMicrotask(() => publish(preferredTheme()));
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if (window.localStorage.getItem("portfolio-theme")) return;
    publish(media.matches ? "dark" : "light");
  };
  media.addEventListener("change", handleSystemChange);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", handleSystemChange);
  };
}

function getSnapshot() {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const resolvedTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((theme: Theme) => {
    window.localStorage.setItem("portfolio-theme", theme);
    publish(theme);
  }, []);

  return <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("usePortfolioTheme must be used within ThemeProvider");
  return context;
}
