"use client";

import { ArrowDown, ArrowUpRight, Code2, GitBranch as Github, Mail, MapPin, Sparkles, Users as Linkedin } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { BlurReveal, TextReveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 72]);
  const contentOpacity = useTransform(scrollY, [0, 650], [1, 0.18]);
  const visualY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -34]);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(36);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${pointerX}% ${pointerY}%, var(--hero-spot), transparent 64%)`;

  function updateSpotlight(event: React.PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section id="top" onPointerMove={updateSpotlight} className="hero-shell relative isolate flex min-h-[100svh] overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pb-14 lg:px-12 lg:pb-12">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-spotlight" style={{ backgroundImage: spotlight }} aria-hidden="true" />
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />

      <motion.div style={{ y, opacity: contentOpacity }} className="relative z-10 mx-auto flex w-full max-w-[86rem] flex-col justify-end">
        <div className="grid items-end gap-10 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-16">
          <div>
            <BlurReveal>
              <div className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10">
                <span className="hero-status"><span className="hero-status__pulse" /><Sparkles className="size-3.5" />{portfolio.identity.role}</span>
                <span className="hero-location"><MapPin className="size-3.5" />{portfolio.identity.location}</span>
              </div>
            </BlurReveal>
            <h1 className="max-w-[12ch] text-balance text-[clamp(3.25rem,8.6vw,8.75rem)] font-semibold leading-[0.87] tracking-[-0.078em]">
              <TextReveal text={portfolio.identity.headline} className="hero-title-reveal" />
            </h1>
          </div>

          <motion.div style={{ y: visualY }} className="hero-console hidden xl:block" aria-hidden="true">
            <div className="hero-console__top"><span>BUILD STATUS</span><span className="hero-console__live">LIVE</span></div>
            <div className="hero-console__signal"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="hero-console__row"><Code2 /><span>Flutter products</span><strong>01</strong></div>
            <div className="hero-console__row"><Sparkles /><span>Applied AI systems</span><strong>02</strong></div>
            <div className="hero-console__foot"><span>DESIGN</span><i /><span>ENGINEER</span><i /><span>ITERATE</span></div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-8 border-t border-[var(--border)] pt-6 sm:mt-10 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,31rem)]">
          <BlurReveal delay={0.72}>
            <div className="flex flex-wrap gap-3">
              <MagneticButton><Button asChild size="lg"><a href="#projects">View my work<ArrowUpRight className="size-4" /></a></Button></MagneticButton>
              <MagneticButton><Button asChild size="lg" variant="secondary"><a href="#contact"><Mail className="size-4" />Contact me</a></Button></MagneticButton>
              <div className="flex gap-2 sm:ml-2">
                <Button asChild variant="icon" size="icon"><a href={portfolio.links.github} target="_blank" rel="noreferrer" aria-label="Open Syed Mustafa on GitHub"><Github className="size-4" /></a></Button>
                <Button asChild variant="icon" size="icon"><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" aria-label="Open Syed Mustafa on LinkedIn"><Linkedin className="size-4" /></a></Button>
              </div>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.86}><p className="max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">{portfolio.identity.shortBio}</p></BlurReveal>
        </div>
      </motion.div>

      <motion.a href="#about" initial={reduced ? false : { opacity: 0 }} animate={reduced ? undefined : { opacity: 1 }} transition={{ delay: 1.2, duration: 0.5, ease }} className="hero-scroll">
        <span>Scroll to explore</span><span className="hero-scroll__line" /><motion.span animate={reduced ? undefined : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowDown className="size-4" /></motion.span>
      </motion.a>
    </section>
  );
}
