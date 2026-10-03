"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorAura() {
  const root = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.32 });
  const ringY = useSpring(pointerY, { stiffness: 420, damping: 34, mass: 0.32 });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = root.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      node.dataset.visible = "true";
    };
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a, button, [data-cursor]") : null;
      node.dataset.interactive = target ? "true" : "false";
      node.dataset.label = target?.getAttribute("data-cursor") ?? "";
    };
    const leave = () => { node.dataset.visible = "false"; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [pointerX, pointerY]);
  return (
    <div ref={root} className="cursor-system" aria-hidden="true">
      <motion.span className="cursor-aura" style={{ x: pointerX, y: pointerY }} />
      <motion.span className="cursor-ring" style={{ x: ringX, y: ringY }}><span /></motion.span>
      <motion.span className="cursor-dot" style={{ x: pointerX, y: pointerY }} />
    </div>
  );
}
