"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.identity.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${portfolio.identity.email}`;
    }
  }

  return <button type="button" className="copy-email" onClick={copyEmail} data-cursor="COPY">{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}<span>{copied ? "COPIED" : "COPY EMAIL"}</span></button>;
}
