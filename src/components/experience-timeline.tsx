"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function ExperienceTimeline() {
  const reduced = useReducedMotion();
  return (
    <div className="journey-track">
      <motion.span className="journey-line" initial={reduced ? false : { scaleY: 0 }} whileInView={reduced ? undefined : { scaleY: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
      <Reveal className="journey-entry"><span className="journey-marker" /><div className="journey-meta"><span>NOW</span><em>Professional experience</em></div><h3>Three active internship roles</h3><p>I’m applying software engineering in real team environments while continuing to build independent Flutter and AI/ML products. Exact organization and role details remain on LinkedIn until they are added here.</p><Button asChild variant="ghost" className="mt-5"><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">View current experience<ArrowUpRight /></a></Button></Reveal>
      <Reveal className="journey-entry" delay={0.12}><span className="journey-marker" /><div className="journey-meta"><span>2023—2027</span><em>Education</em></div><h3>BS Software Engineering</h3><p>COMSATS University Islamabad, Abbottabad Campus—building a broad engineering foundation alongside practical work in application development and machine learning.</p></Reveal>
      <Reveal className="journey-entry" delay={0.2}><span className="journey-marker" /><div className="journey-meta"><span>ONGOING</span><em>Independent practice</em></div><h3>From experiments to complete systems</h3><p>Projects move beyond notebooks into tested APIs, responsive interfaces, mobile workflows, honest evaluation, and documented limitations.</p></Reveal>
    </div>
  );
}
