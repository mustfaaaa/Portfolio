"use client";

import {
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  Braces,
  Check,
  Code2,
  Database,
  ExternalLink,
  GitBranch as Github,
  GraduationCap,
  Mail,
  MapPin,
  Smartphone,
  TerminalSquare,
  Users as Linkedin,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ImageReveal, Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ProjectVisual } from "@/components/project-visual";
import { cn } from "@/lib/utils";

const skillIcons = [Code2, Braces, BrainCircuit, Smartphone, Database, TerminalSquare];

function SectionHeader({ index, eyebrow, title, detail }: { index: string; eyebrow: string; title: string; detail?: string }) {
  return (
    <Reveal className="section-heading">
      <div className="section-kicker"><span>{index}</span><span>{eyebrow}</span></div>
      <h2>{title}</h2>
      {detail && <p>{detail}</p>}
    </Reveal>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-shell section-shell--indexed scroll-mt-24" data-section="01">
      <div className="section-orbit" aria-hidden="true" />
      <div className="section-inner grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start"><SectionHeader index="01" eyebrow="About" title="Engineering with intent." /></div>
        <div>
          <StaggerContainer className="space-y-7">{portfolio.identity.about.map((paragraph, index) => <StaggerItem key={paragraph}><p className={cn("about-copy", index === 0 && "about-copy--lead")}>{paragraph}</p></StaggerItem>)}</StaggerContainer>
          <Reveal delay={0.18} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
            {portfolio.identity.focus.map((focus, index) => <div key={focus} className="focus-cell"><span>0{index + 1}</span><p>{focus}</p><ArrowUpRight /></div>)}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell surface-section scroll-mt-24">
      <div className="section-inner">
        <SectionHeader index="02" eyebrow="Capabilities" title="A practical stack for ambitious ideas." detail="From product interfaces to deployed models, each tool supports a specific part of the system—not a decorative skills list." />
        <StaggerContainer className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-3">
          {portfolio.skills.map((category, index) => {
            const Icon = skillIcons[index];
            return <StaggerItem key={category.title} className="skill-group"><div className="skill-group__top"><span className="skill-icon"><Icon /></span><span>0{index + 1}</span></div><h3>{category.title}</h3><p>{category.description}</p><div className="mt-8 flex flex-wrap gap-2">{category.items.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}</div></StaggerItem>;
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell scroll-mt-24">
      <div className="section-inner">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionHeader index="03" eyebrow="Selected work" title="Systems built to be used." detail="Three projects across speech intelligence, explainable prediction, and computer vision—each presented with a verified outcome." /><Reveal><span className="project-count">03 / FEATURED SYSTEMS</span></Reveal></div>
        <div className="mt-16 space-y-24 lg:space-y-36">
          {portfolio.projects.map((project, index) => (
            <article key={project.title} className={cn("project-row group grid items-center gap-8 lg:grid-cols-12 lg:gap-14", index % 2 && "project-row--reverse")} data-cursor="VIEW">
              <div className={cn("relative lg:col-span-7", index % 2 && "lg:order-2")}>
                <span className="project-number" aria-hidden="true">0{index + 1}</span>
                <ImageReveal className="relative aspect-[1.12/1] rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]"><ProjectVisual project={project} index={index} /></ImageReveal>
              </div>
              <Reveal className={cn("lg:col-span-5", index % 2 && "lg:order-1")} delay={0.12}>
                <span className="project-eyebrow">{project.eyebrow}</span>
                <h3 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{project.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">{project.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{project.detail}</p>
                <dl className="project-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Verified outcome</dt><dd>{project.outcome}</dd></div></dl>
                <ul className="mt-6 space-y-3">{project.features.map((feature) => <li key={feature} className="flex gap-3 text-sm text-[var(--muted)]"><Check className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />{feature}</li>)}</ul>
                <div className="mt-7 flex flex-wrap gap-2">{project.technologies.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
                <div className="mt-8"><MagneticButton><Button asChild variant="secondary"><a href={project.github} target="_blank" rel="noreferrer"><Github className="size-4" />Explore source<ArrowUpRight className="size-4" /></a></Button></MagneticButton></div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const reduced = useReducedMotion();
  return (
    <section id="experience" className="section-shell journey-section scroll-mt-24">
      <div className="section-inner grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <SectionHeader index="04" eyebrow="Journey" title="Learning in public. Building in practice." detail="A foundation in software engineering, strengthened through three ongoing internship engagements and independent product work." />
        <div className="journey-track">
          <motion.span className="journey-line" initial={reduced ? false : { scaleY: 0 }} whileInView={reduced ? undefined : { scaleY: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
          <Reveal className="journey-entry"><span className="journey-marker" /><div className="journey-meta"><span>NOW</span><em>Professional experience</em></div><h3>Three active internship roles</h3><p>I’m applying software engineering in real team environments while continuing to build independent Flutter and AI/ML products. Exact organization and role details remain on LinkedIn until they are added here.</p><Button asChild variant="ghost" className="mt-5"><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">View current experience<ArrowUpRight /></a></Button></Reveal>
          <Reveal className="journey-entry" delay={0.12}><span className="journey-marker" /><div className="journey-meta"><span>2023—2027</span><em>Education</em></div><h3>BS Software Engineering</h3><p>COMSATS University Islamabad, Abbottabad Campus—building a broad engineering foundation alongside practical work in application development and machine learning.</p></Reveal>
          <Reveal className="journey-entry" delay={0.2}><span className="journey-marker" /><div className="journey-meta"><span>ONGOING</span><em>Independent practice</em></div><h3>From experiments to complete systems</h3><p>Projects move beyond notebooks into tested APIs, responsive interfaces, mobile workflows, honest evaluation, and documented limitations.</p></Reveal>
        </div>
      </div>
    </section>
  );
}

export function CredentialsSection() {
  const education = portfolio.education[0];
  return (
    <section id="education" className="section-shell education-section scroll-mt-24">
      <div className="section-inner grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <SectionHeader index="05" eyebrow="Education" title="Strong foundations. Applied continuously." />
        <Reveal className="education-card">
          <div className="education-icon"><GraduationCap /></div>
          <div><span className="education-date">{education.dates}</span><h3>{education.program}</h3><p>{education.degree} · {education.institution}</p><small>{education.detail}</small></div>
          <span className="education-coordinate"><MapPin />Abbottabad, Pakistan</span>
        </Reveal>
      </div>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section id="impact" className="section-shell impact-section">
      <div className="section-inner">
        <SectionHeader index="06" eyebrow="Measured impact" title="Results that can be inspected." detail="No inflated proficiency bars or invented statistics—only outcomes documented inside the projects." />
        <StaggerContainer className="impact-grid">{portfolio.achievements.map((item, index) => <StaggerItem className="impact-item" key={item.title}><span className="impact-index">0{index + 1}</span><strong>{item.metric}</strong><h3>{item.title}</h3><p>{item.detail}</p></StaggerItem>)}</StaggerContainer>
      </div>
    </section>
  );
}

export function ArticlesSection() {
  return (
    <section id="articles" className="section-shell surface-section scroll-mt-24">
      <div className="section-inner">
        <SectionHeader index="07" eyebrow="Engineering notes" title="The thinking behind the build." detail="Technical deep dives live beside the source, where decisions, limitations, and results can be reviewed together." />
        <StaggerContainer className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {portfolio.articles.map((article, index) => <StaggerItem key={article.title}><a href={article.link} target="_blank" rel="noreferrer" className="article-row" data-cursor="READ"><span className="article-index">0{index + 1}</span><div><div className="mb-3 flex flex-wrap gap-2"><span className="article-meta">{article.category} · {article.readingTime}</span></div><h3>{article.title}</h3><p>{article.summary}</p></div><div className="article-date">{article.date}</div><span className="article-action" aria-hidden="true"><ExternalLink /></span></a></StaggerItem>)}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="contact-section scroll-mt-24">
      <div className="contact-grid" aria-hidden="true" /><div className="contact-orbit" aria-hidden="true" />
      <div className="section-inner relative z-10 py-24 sm:py-32 lg:py-40">
        <Reveal><div className="section-kicker text-white/60"><span>08</span><span>Contact</span></div><h2 className="mt-8 max-w-5xl text-balance text-[clamp(3.15rem,8vw,7.8rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-white">Let’s build something meaningful.</h2><p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">Open to software engineering internships, Flutter opportunities, and applied AI/ML collaborations.</p></Reveal>
        <Reveal delay={0.16} className="mt-10 flex flex-wrap gap-3"><MagneticButton><Button asChild size="lg" className="bg-white text-[#07101e] hover:bg-[#70d7ff] hover:text-[#07101e]"><a href={`mailto:${portfolio.identity.email}`}><Mail className="size-4" />Email me</a></Button></MagneticButton><Button asChild size="lg" variant="secondary" className="border-white/20 bg-white/5 text-white hover:bg-white/10"><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer"><Linkedin className="size-4" />LinkedIn</a></Button><Button asChild size="lg" variant="secondary" className="border-white/20 bg-white/5 text-white hover:bg-white/10"><a href={portfolio.links.github} target="_blank" rel="noreferrer"><Github className="size-4" />GitHub</a></Button></Reveal>
        <Reveal delay={0.24}><p className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-white/45"><span>{portfolio.identity.email}</span><i className="size-1 rounded-full bg-[#70d7ff]" /><span>{portfolio.identity.location}</span></p></Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[86rem] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-[var(--foreground)] text-xs font-bold text-[var(--background)]">{portfolio.identity.initials}</span><strong>{portfolio.identity.name}</strong></div><p className="mt-4 max-w-md text-sm text-[var(--muted)]">Building useful software where product thinking meets intelligent systems.</p></div><div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]"><span>© {new Date().getFullYear()} {portfolio.identity.name}</span><a className="footer-link" href={portfolio.links.github} target="_blank" rel="noreferrer">GitHub</a><a className="footer-link" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><Button asChild variant="icon" size="icon"><a href="#top" aria-label="Back to top"><ArrowUp className="size-4" /></a></Button></div></div></footer>
  );
}
