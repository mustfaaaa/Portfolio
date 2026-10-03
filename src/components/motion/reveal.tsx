"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, amount = 0.2 }: { children: React.ReactNode; className?: string; delay?: number; amount?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount }} transition={{ duration: 0.58, delay, ease }}>{children}</motion.div>;
}

export function BlurReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(12px)" }} animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={reduced ? undefined : stagger} initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "visible"} viewport={{ once: true, amount: 0.15 }}>{children}</motion.div>;
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} variants={item}>{children}</motion.div>;
}

export function TextReveal({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span className={cn("flex flex-wrap gap-x-[0.22em] gap-y-0", className)} initial={reduced ? false : "hidden"} animate={reduced ? undefined : "visible"} variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } } }}>
      {text.split(" ").map((word, index) => <span className="overflow-hidden pb-[0.08em]" key={`${word}-${index}`}><motion.span className="inline-block" variants={{ hidden: { y: "105%", opacity: 0, filter: "blur(8px)" }, visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.58, ease } } }}>{word}</motion.span></span>)}
    </motion.span>
  );
}

export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.72, ease }}
    >
      <motion.div
        className="h-full"
        initial={reduced ? false : { scale: 1.075 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.05, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function MotionReveal({ children, className, from }: { children: React.ReactNode; className?: string; from: { opacity?: number; x?: number; y?: number; scale?: number } }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : from} whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease }}>{children}</motion.div>;
}

export function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return <MotionReveal className={className} from={{ opacity: 0 }}>{children}</MotionReveal>;
}

export function SlideUp({ children, className }: { children: React.ReactNode; className?: string }) {
  return <MotionReveal className={className} from={{ opacity: 0, y: 24 }}>{children}</MotionReveal>;
}

export function SlideIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return <MotionReveal className={className} from={{ opacity: 0, x: -24 }}>{children}</MotionReveal>;
}

export function ScaleIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return <MotionReveal className={className} from={{ opacity: 0, scale: 0.96 }}>{children}</MotionReveal>;
}

export function Parallax({ children, className, distance = 40 }: { children: React.ReactNode; className?: string; distance?: number }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : distance]);
  return <motion.div className={className} style={{ y }}>{children}</motion.div>;
}
