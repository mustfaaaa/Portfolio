"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 22, mass: 0.35 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 22, mass: 0.35 });
  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType === "touch" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * 0.12);
    y.set((event.clientY - (box.top + box.height / 2)) * 0.12);
  }
  function reset() { x.set(0); y.set(0); }
  return <motion.div ref={ref} className={cn("inline-flex", className)} style={{ x, y }} onPointerMove={move} onPointerLeave={reset}>{children}</motion.div>;
}
