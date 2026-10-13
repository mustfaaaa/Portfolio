"use client";

import { useState } from "react";
import { ArrowRight, Braces, BrainCircuit, Database, Smartphone, TerminalSquare } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const icons = [Braces, TerminalSquare, BrainCircuit, Smartphone, Database, TerminalSquare];

export function SkillsArchitecture() {
  const [activeSkill, setActiveSkill] = useState("Flutter");
  const activeCategory = portfolio.skills.find((category) => category.items.includes(activeSkill)) ?? portfolio.skills[0];
  const usedIn = portfolio.projects.filter((project) => project.technologies.includes(activeSkill));

  return (
    <div className="stack-map">
      <div className="stack-map__rail" aria-label="Technology categories">
        {portfolio.skills.map((category, index) => {
          const Icon = icons[index];
          return (
            <section className="stack-map__group" key={category.title}>
              <header><span>0{index + 1}</span><Icon aria-hidden="true" /><h3>{category.title}</h3></header>
              <div className="stack-map__skills">
                {category.items.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    className={activeSkill === skill ? "is-active" : ""}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onFocus={() => setActiveSkill(skill)}
                    onClick={() => setActiveSkill(skill)}
                    aria-pressed={activeSkill === skill}
                  >
                    {skill}<ArrowRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="stack-map__context" aria-live="polite">
        <span className="stack-map__status"><i />TECHNOLOGY / ACTIVE</span>
        <strong>{activeSkill}</strong>
        <p>{activeCategory.description}</p>
        <div className="stack-map__path" aria-hidden="true"><i /><i /><i /><i /></div>
        <dl>
          <div><dt>Layer</dt><dd>{activeCategory.title}</dd></div>
          <div><dt>Applied in</dt><dd>{usedIn.length ? usedIn.map((project) => project.title).join(" · ") : "Engineering workflow"}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
