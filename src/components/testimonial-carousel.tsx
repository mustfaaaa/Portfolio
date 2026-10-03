"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const item = portfolio.testimonials[index];
  const previous = () => setIndex((value) => (value - 1 + portfolio.testimonials.length) % portfolio.testimonials.length);
  const next = () => setIndex((value) => (value + 1) % portfolio.testimonials.length);
  return (
    <div className="testimonial-shell" tabIndex={0} onKeyDown={(event) => event.key === "ArrowLeft" ? previous() : event.key === "ArrowRight" ? next() : undefined}>
      <div className="testimonial-topline"><Quote className="size-5 text-[var(--accent)]" /><span>Reference / {String(index + 1).padStart(2, "0")}</span></div>
      <div className="min-h-[15rem] sm:min-h-[13rem]" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.figure key={index} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.32 }}><blockquote className="max-w-4xl text-balance text-2xl font-medium leading-snug tracking-[-0.035em] sm:text-3xl">“{item.quote}”</blockquote><figcaption className="mt-8 text-sm"><strong>{item.name}</strong><span className="mx-2 text-[var(--muted)]">/</span><span className="text-[var(--muted)]">{item.role}, {item.organization}</span></figcaption></motion.figure></AnimatePresence></div>
      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5"><div className="flex gap-1.5" aria-hidden="true">{portfolio.testimonials.map((_, dot) => <span key={dot} className={`h-1 rounded-full transition-all ${dot === index ? "w-8 bg-[var(--accent)]" : "w-3 bg-[var(--border-strong)]"}`} />)}</div><div className="flex gap-2"><Button variant="icon" size="icon" onClick={previous} aria-label="Previous testimonial"><ChevronLeft className="size-4" /></Button><Button variant="icon" size="icon" onClick={next} aria-label="Next testimonial"><ChevronRight className="size-4" /></Button></div></div>
    </div>
  );
}
