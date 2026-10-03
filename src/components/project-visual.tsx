"use client";

import Image from "next/image";
import { Activity, AudioLines, Braces, Check, Circle, HeartPulse, ScanText, Sparkles, TriangleAlert } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

function WindowFrame({ children, index }: { children: React.ReactNode; index: number }) {
  return <div className="project-window"><div className="project-window__bar"><div className="flex gap-1.5" aria-hidden="true"><Circle /><Circle /><Circle /></div><span>PROJECT / 0{index + 1}</span><Braces aria-hidden="true" /></div>{children}</div>;
}

function MakharijPreview() {
  return <div className="project-screen makharij-screen"><div className="preview-rail"><span className="preview-mark"><Sparkles /></span><i /><i /><i /></div><div className="makharij-main"><div className="preview-label"><span>RECITATION / LIVE</span><em>Listening</em></div><div className="arabic-line" lang="ar" dir="rtl"><span>الرَّحْمَٰنِ</span><span className="is-active">الرَّحِيمِ</span><span>الْحَمْدُ</span></div><div className="audio-wave">{[15,34,22,56,76,42,88,58,31,62,28,48,20,39,16].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="feedback-row"><span><Check />Correct</span><span><AudioLines />Word aligned</span><strong>92%</strong></div></div></div>;
}

function CardiacPreview() {
  return <div className="project-screen risk-screen"><div className="risk-header"><span><HeartPulse />Model explorer</span><em>VALIDATED</em></div><div className="risk-grid"><div className="risk-gauge"><div><strong>0.959</strong><span>ROC–AUC</span></div></div><div className="risk-factors"><span>Prediction factors</span><div><i style={{ width: "84%" }} /><small>Chest pain</small></div><div><i style={{ width: "66%" }} /><small>Max heart rate</small></div><div><i style={{ width: "44%" }} /><small>ST depression</small></div></div></div><div className="risk-footer"><span><Activity />Calibrated threshold</span><strong>0.38</strong></div></div>;
}

function CharacterPreview() {
  return <div className="project-screen character-screen"><div className="character-board"><span className="preview-label">INPUT / DRAW</span><strong>A</strong><i /><i /></div><div className="character-result"><div className="character-scan"><ScanText /><span>47 classes</span></div><span className="preview-label">PREDICTION</span><strong>A <em>90.01%</em></strong><div className="confidence-bars"><i style={{ width: "90%" }} /><i style={{ width: "38%" }} /><i style={{ width: "21%" }} /></div><span className="character-note"><TriangleAlert />Confidence shown with alternatives</span></div></div>;
}

export function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  if (project.image) return <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />;
  return (
    <div className={`project-visual project-visual--${project.visual}`} aria-label={`Interface concept for ${project.title}`} role="img">
      <motion.div className="project-preview-wrap" initial={reduced ? false : { opacity: 0, y: 28, rotateX: 5 }} whileInView={reduced ? undefined : { opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.75, ease }}>
        <WindowFrame index={index}>{project.visual === "signal" ? <MakharijPreview /> : project.visual === "atlas" ? <CardiacPreview /> : <CharacterPreview />}</WindowFrame>
      </motion.div>
      <span className="project-orbit" aria-hidden="true" />
      <span className="project-grid-mark project-grid-mark--one" aria-hidden="true">+</span>
      <span className="project-grid-mark project-grid-mark--two" aria-hidden="true">+</span>
    </div>
  );
}
