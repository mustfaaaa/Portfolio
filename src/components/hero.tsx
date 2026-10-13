"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  Code2,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Mail,
  Microchip,
  ServerCog,
  Smartphone,
  Users as Linkedin,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { BlurReveal, TextReveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

const ease = [0.22, 1, 0.36, 1] as const;
const waveHeights = [18, 36, 24, 58, 82, 46, 94, 62, 30, 74, 48, 88, 42, 68, 28, 52, 20];

export function Hero() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectFocused, setProjectFocused] = useState(false);
  const dragStart = useRef<number | null>(null);
  const featuredProject = portfolio.projects[projectIndex];
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(42);
  const projectX = useTransform(pointerX, [0, 100], [-5, 5]);
  const projectY = useTransform(pointerY, [0, 100], [-4, 4]);
  const heroY = useTransform(scrollY, [0, 720], [0, reduced ? 0 : 64]);
  const heroOpacity = useTransform(scrollY, [0, 680], [1, 0.16]);
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${pointerX}% ${pointerY}%, var(--hero-spot), transparent 66%)`;

  function updateScene(event: React.PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  function selectProject(direction: number) {
    setProjectFocused(false);
    setProjectIndex((current) => (current + direction + portfolio.projects.length) % portfolio.projects.length);
  }

  function showProject(index: number) {
    setProjectFocused(false);
    setProjectIndex(index);
  }

  function finishSwipe(clientX: number) {
    if (dragStart.current === null) return;
    const distance = clientX - dragStart.current;
    if (Math.abs(distance) > 42) selectProject(distance < 0 ? 1 : -1);
    dragStart.current = null;
  }

  return (
    <section id="top" onPointerMove={updateScene} className={`hero-shell hero-workspace${projectFocused ? " hero-workspace--project-focus" : ""}`}>
      <div className="hero-workspace__grid" aria-hidden="true" />
      <div className="hero-workspace__shade" aria-hidden="true" />
      <motion.div className="hero-spotlight" style={{ backgroundImage: spotlight }} aria-hidden="true" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="hero-workspace__content">
        <div className="hero-workspace__layout">
          <div className="hero-workspace__copy">
            <BlurReveal>
              <div className="hero-workspace__eyebrow">
                <span />
                <Code2 aria-hidden="true" />
                {portfolio.identity.role}
              </div>
            </BlurReveal>

            <h1 className="hero-workspace__title">
              <TextReveal text={portfolio.identity.headline} className="hero-title-reveal" />
            </h1>

            <BlurReveal delay={0.62}>
              <p className="hero-workspace__intro">
                Flutter products, reliable backends, and practical AI/ML systems.
              </p>
            </BlurReveal>

            <BlurReveal delay={0.76}>
              <div className="hero-workspace__actions">
                <MagneticButton>
                  <Button asChild size="lg">
                    <a href="#projects">Explore projects<ArrowUpRight aria-hidden="true" /></a>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="secondary">
                    <a href="#contact"><Mail aria-hidden="true" />Contact me</a>
                  </Button>
                </MagneticButton>
              </div>
            </BlurReveal>
          </div>

          <motion.aside
            className={`hero-feature${projectFocused ? " is-focused" : ""}`}
            style={{ x: reduced ? 0 : projectX, y: reduced ? 0 : projectY }}
            initial={reduced ? false : { opacity: 0, x: 34, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.72, duration: 0.72, ease }}
          >
            <div
              className="hero-feature__deck"
              onPointerDown={(event) => { dragStart.current = event.clientX; }}
              onPointerUp={(event) => finishSwipe(event.clientX)}
              onPointerCancel={() => { dragStart.current = null; }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") selectProject(-1);
                if (event.key === "ArrowRight") selectProject(1);
                if (event.key === "Escape") setProjectFocused(false);
              }}
              tabIndex={0}
              role="region"
              aria-label="Featured project selector. Use left and right arrow keys to change project."
            >
            <button
              type="button"
              className="hero-feature__card"
              onClick={() => setProjectFocused((current) => !current)}
              aria-expanded={projectFocused}
              aria-controls="hero-project-details"
              aria-label={`${projectFocused ? "Close" : "Focus"} ${featuredProject.title} technical details`}
              data-cursor={projectFocused ? "CLOSE" : `FOCUS 0${projectIndex + 1}`}
            >
              <div className="hero-feature__screen">
                <div className="hero-feature__screenbar">
                  <span>SELECTED SYSTEM</span>
                  <i>{featuredProject.visual === "signal" ? "AUDIO / AI" : featuredProject.visual === "atlas" ? "EXPLAINABLE ML" : "COMPUTER VISION"}</i>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={featuredProject.slug}
                  className={`hero-feature__app hero-feature__app--${featuredProject.visual}`}
                  initial={reduced ? false : { opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
                  exit={reduced ? undefined : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  transition={{ duration: 0.42, ease }}
                >
                  <div className="hero-feature__rail">
                    <span>SM</span><i /><i /><i />
                  </div>
                  <div className="hero-feature__analysis">
                    {featuredProject.visual === "signal" ? <>
                      <div className="hero-feature__analysis-top"><span>RECITATION / ACTIVE</span><AudioLines /></div>
                      <div className="hero-feature__wave" aria-hidden="true">{waveHeights.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                      <div className="hero-feature__result"><span lang="ar" dir="rtl">ض</span><p>Word-aligned<br />feedback</p></div>
                    </> : featuredProject.visual === "atlas" ? <>
                      <div className="hero-feature__analysis-top"><span>MODEL / VALIDATED</span><BrainCircuit /></div>
                      <div className="hero-feature__metric"><strong>0.959</strong><span>ROC–AUC</span><i /></div>
                      <div className="hero-feature__result"><span>96.4</span><p>Held-out<br />sensitivity</p></div>
                    </> : <>
                      <div className="hero-feature__analysis-top"><span>INPUT / CLASSIFY</span><Code2 /></div>
                      <div className="hero-feature__glyph"><strong>A</strong><span>47 classes</span></div>
                      <div className="hero-feature__result"><span>90</span><p>Test accuracy<br />documented</p></div>
                    </>}
                  </div>
                </motion.div>
                </AnimatePresence>
              </div>
              <div className="hero-feature__meta">
                <div><span>0{projectIndex + 1} / Engineering case study</span><strong>{featuredProject.title}</strong></div>
                <span className="hero-feature__count">{projectFocused ? "CLOSE" : "FOCUS"} · 0{projectIndex + 1}/0{portfolio.projects.length}</span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {projectFocused && (
                <motion.div
                  id="hero-project-details"
                  className="hero-feature__details"
                  initial={reduced ? false : { opacity: 0, height: 0, y: -12 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.42, ease }}
                >
                  <div className="hero-feature__chip" aria-hidden="true">
                    <Microchip />
                    <i /><i /><i /><i />
                  </div>
                  <div className="hero-feature__details-copy">
                    <span>Architecture activated</span>
                    <strong>{featuredProject.role}</strong>
                    <p>{featuredProject.engineering.slice(0, 2).join(" · ")}</p>
                    <div className="hero-feature__badges">
                      {featuredProject.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <Link href={`/work/${featuredProject.slug}`} transitionTypes={["nav-forward"]}>
                      Open case study <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hero-feature__controls" aria-label="Choose featured project">
              <button type="button" onClick={() => selectProject(-1)} aria-label="Previous project"><ChevronLeft /></button>
              <div>{portfolio.projects.map((project, index) => <button key={project.slug} type="button" className={index === projectIndex ? "is-active" : ""} onClick={() => showProject(index)} aria-label={`Show ${project.title}`} aria-current={index === projectIndex ? "true" : undefined} />)}</div>
              <button type="button" onClick={() => selectProject(1)} aria-label="Next project"><ChevronRight /></button>
            </div>
            </div>

            <div className="hero-feature__focus">
              <span>Selected architecture</span>
              <p>{featuredProject.technologies.slice(0, 3).join(" · ")}</p>
            </div>
          </motion.aside>
        </div>

        <BlurReveal delay={0.96}>
          <div className="hero-workspace__rail">
            <div className="hero-workspace__stack" aria-label="Primary technologies">
              <span><Smartphone aria-hidden="true" />Flutter</span>
              <span><ServerCog aria-hidden="true" />FastAPI</span>
              <span><BrainCircuit aria-hidden="true" />AI/ML</span>
            </div>
            <div className="hero-workspace__socials">
              <a href={portfolio.links.github} target="_blank" rel="noreferrer"><GitBranch aria-hidden="true" />GitHub</a>
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
            </div>
          </div>
        </BlurReveal>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-workspace__scroll"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.45 }}
      >
        <span>Scroll</span><ArrowDown aria-hidden="true" />
      </motion.a>
    </section>
  );
}
