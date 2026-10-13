import { PortfolioPage } from "@/components/portfolio-page";
import { ViewTransition } from "react";

export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <PortfolioPage />
    </ViewTransition>
  );
}
