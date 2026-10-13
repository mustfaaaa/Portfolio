"use client";

import Link from "next/link";
import { ViewTransition, useRef, useState } from "react";
import { ArrowUpRight, Check, GitBranch } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { Project } from "@/data/portfolio";
import { ProjectVisual } from "@/components/project-visual";

const stages = ["Context", "Problem", "Engineering", "Outcome"] as const;

export function FeaturedCaseStudy({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduced) return;
    const next = Math.min(stages.length - 1, Math.floor(progress * stages.length));
    setActiveStage((current) => current === next ? current : next);
  });

  return (
    <article ref={root} className="featured-story" data-cursor="OPEN 01">
      <div className="featured-story__visual">
        <div className="featured-story__visual-top"><span>PROJECT 01 / FEATURED SYSTEM</span><strong>{stages[activeStage]}</strong></div>
        <ViewTransition name={`project-${project.slug}`} share="project-morph" default="none">
          <Link href={`/work/${project.slug}`} transitionTypes={["nav-forward"]} aria-label={`Read ${project.title} case study`}>
            <ProjectVisual project={project} index={0} />
          </Link>
        </ViewTransition>
        <div className="featured-story__progress" aria-hidden="true">
          {stages.map((stage, index) => <span key={stage} className={index <= activeStage ? "is-active" : ""} />)}
        </div>
      </div>

      <div className="featured-story__chapters">
        <header className="featured-story__heading">
          <span>{project.eyebrow}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </header>

        <section className="featured-story__chapter" data-active={activeStage === 0}><span>01 / Context</span><h4>Making advanced feedback understandable.</h4><p>{project.context}</p></section>
        <section className="featured-story__chapter" data-active={activeStage === 1}><span>02 / Problem</span><h4>Recognition output was only the beginning.</h4><p>{project.problem}</p></section>
        <section className="featured-story__chapter" data-active={activeStage === 2}><span>03 / Engineering</span><h4>An end-to-end product system.</h4><ul>{project.engineering.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></section>
        <section className="featured-story__chapter" data-active={activeStage === 3}><span>04 / Outcome</span><h4>{project.outcome}</h4><p>Every claim above is tied to the published project and source repository.</p><div className="featured-story__links"><Link href={`/work/${project.slug}`} transitionTypes={["nav-forward"]}>Read full case study<ArrowUpRight /></Link><a href={project.github} target="_blank" rel="noreferrer"><GitBranch />Source</a></div></section>
      </div>
    </article>
  );
}
