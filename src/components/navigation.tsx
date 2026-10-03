"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.25 });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const sections = portfolio.navigation.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <nav aria-label="Primary navigation" className={cn("pointer-events-auto mx-auto flex h-16 max-w-[86rem] items-center justify-between rounded-2xl px-3 transition-[background-color,border-color,box-shadow,transform] duration-300 sm:px-4", scrolled && "translate-y-0 border border-[var(--border)] bg-[color:var(--nav-surface)] shadow-[0_18px_50px_-30px_rgba(0,0,0,.55)] backdrop-blur-xl") }>
        <a href="#top" className="group flex items-center gap-2 rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" aria-label={`${portfolio.identity.name}, back to top`}>
          <span className="grid size-8 place-items-center rounded-lg bg-[var(--foreground)] text-xs font-bold text-[var(--background)] transition-transform duration-200 group-hover:rotate-3">{portfolio.identity.initials}</span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">{portfolio.identity.name}</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {portfolio.navigation.map((nav) => <a key={nav.href} href={nav.href} className={cn("relative isolate rounded-full px-3 py-2 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]", active === nav.href.slice(1) && "text-[var(--foreground)]")}>{active === nav.href.slice(1) && <motion.span layoutId="active-nav" className="absolute inset-0 -z-10 rounded-full border border-[var(--border)] bg-[var(--surface)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}{nav.label}</a>)}
        </div>
        <div className="flex items-center gap-2"><ThemeToggle /><div className="lg:hidden"><Sheet><SheetTrigger asChild><Button variant="icon" size="icon" aria-label="Open navigation"><Menu className="size-5" /></Button></SheetTrigger><SheetContent><SheetTitle className="text-sm font-semibold">Navigate</SheetTitle><SheetDescription className="mt-1 text-sm text-[var(--muted)]">Explore the portfolio by section.</SheetDescription><div className="mt-14 flex flex-col">{portfolio.navigation.map((nav, index) => <SheetClose asChild key={nav.href}><a href={nav.href} className="flex items-baseline justify-between border-b border-[var(--border)] py-4 text-2xl font-semibold tracking-[-0.04em] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:text-[var(--accent)]">{nav.label}<span className="font-mono text-xs font-normal text-[var(--muted)]">0{index + 1}</span></a></SheetClose>)}</div></SheetContent></Sheet></div></div>
      </nav>
    </header>
  );
}
