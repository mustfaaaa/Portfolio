import { CursorAura } from "@/components/cursor-aura";
import { EntryExperience } from "@/components/entry-experience";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { AboutSection, AchievementsSection, ArticlesSection, ContactSection, CredentialsSection, ExperienceSection, Footer, ProjectsSection, SkillsSection } from "@/components/portfolio-sections";

export function PortfolioPage() {
  return <><a href="#main-content" className="skip-link">Skip to content</a><EntryExperience /><CursorAura /><Navigation /><main id="main-content"><Hero /><AboutSection /><SkillsSection /><ProjectsSection /><ExperienceSection /><CredentialsSection /><AchievementsSection /><ArticlesSection /><ContactSection /></main><Footer /></>;
}
