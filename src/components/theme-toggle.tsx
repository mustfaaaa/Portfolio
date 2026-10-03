"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { usePortfolioTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = usePortfolioTheme();
  const reduced = useReducedMotion();
  const dark = resolvedTheme === "dark";
  return (
    <Button type="button" variant="icon" size="icon" aria-label={`Switch to ${dark ? "light" : "dark"} theme`} onClick={() => setTheme(dark ? "light" : "dark") }>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? "sun" : "moon"} initial={reduced ? false : { opacity: 0, rotate: -35, scale: .7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, rotate: 35, scale: .7 }} transition={{ duration: .2 }}>
          {dark ? <Sun className="size-[1.125rem]" aria-hidden="true" /> : <Moon className="size-[1.125rem]" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
