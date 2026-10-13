import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, GitBranch } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ProjectVisual } from "@/components/project-visual";

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${portfolio.identity.name}`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const projectIndex = portfolio.projects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();
  const project = portfolio.projects[projectIndex];
  const nextProject = portfolio.projects[(projectIndex + 1) % portfolio.projects.length];

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <main className="case-page" id="main-content">
        <header className="case-nav">
          <Link href="/#projects" transitionTypes={["nav-back"]}><ArrowLeft aria-hidden="true" />Selected work</Link>
          <Link href="/" transitionTypes={["nav-back"]} className="case-nav__mark" aria-label="Syed Mustafa home">SM</Link>
          <a href={project.github} target="_blank" rel="noreferrer">Source<ArrowUpRight aria-hidden="true" /></a>
        </header>

        <article>
          <header className="case-hero">
            <div className="case-hero__meta"><span>PROJECT / 0{projectIndex + 1}</span><span>{project.eyebrow}</span></div>
            <h1>{project.title}</h1>
            <div className="case-hero__intro"><p>{project.description}</p><dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Stack</dt><dd>{project.technologies.join(" · ")}</dd></div></dl></div>
          </header>

          <ViewTransition name={`project-${project.slug}`} share="project-morph" default="none">
            <div className="case-visual"><ProjectVisual project={project} index={projectIndex} /></div>
          </ViewTransition>

          <div className="case-narrative">
            <section><span>01 / Context</span><h2>Why this system exists.</h2><p>{project.context}</p></section>
            <section><span>02 / Problem</span><h2>The engineering constraint.</h2><p>{project.problem}</p></section>
            <section className="case-narrative__engineering"><span>03 / Engineering</span><h2>How the pieces connect.</h2><ol>{project.engineering.map((item, index) => <li key={item}><b>0{index + 1}</b><p>{item}</p><ArrowRight aria-hidden="true" /></li>)}</ol></section>
            <section><span>04 / Implementation</span><h2>Inspectable decisions.</h2><div className="case-annotations">{project.annotations.map((annotation, index) => <article key={annotation.label} tabIndex={0}><b>0{index + 1}</b><h3>{annotation.label}</h3><p>{annotation.detail}</p></article>)}</div></section>
            <section className="case-outcome"><span>05 / Verified outcome</span><h2>{project.outcome}</h2><ul>{project.features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><a href={project.github} target="_blank" rel="noreferrer"><GitBranch aria-hidden="true" />Inspect the source<ArrowUpRight aria-hidden="true" /></a></section>
          </div>
        </article>

        <footer className="case-next">
          <span>NEXT CASE STUDY</span>
          <Link href={`/work/${nextProject.slug}`} transitionTypes={["nav-forward"]}><strong>{nextProject.title}</strong><ArrowRight aria-hidden="true" /></Link>
        </footer>
      </main>
    </ViewTransition>
  );
}
