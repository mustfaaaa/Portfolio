"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useState } from "react";

const DURATION = 3050;
const SESSION_KEY = "sm-portfolio-intro-seen";
const ease = [0.22, 1, 0.36, 1] as const;

const projectFolios = [
  { number: "01", title: "MakharijPro AI", discipline: "Flutter · Speech AI", visual: "م" },
  { number: "02", title: "Cardiac Risk", discipline: "FastAPI · Explainable ML", visual: ".959" },
  { number: "03", title: "Character Vision", discipline: "TensorFlow · OpenCV", visual: "Aa" },
] as const;

export function EntryExperience() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (reduceMotion || window.sessionStorage.getItem(SESSION_KEY)) return;

    window.sessionStorage.setItem(SESSION_KEY, "true");
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const timeout = window.setTimeout(() => setVisible(false), DURATION);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="entry-experience entry-experience--compact"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.58, ease }}
        >
          <div className="entry-experience__visuals" aria-hidden="true">
            <motion.div className="entry-experience__line entry-experience__line--horizontal" initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1] }} transition={{ duration: 1.05, ease }} />
            <motion.div className="entry-experience__line entry-experience__line--vertical" initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1] }} transition={{ duration: 1.05, delay: 0.08, ease }} />

            <motion.div
              className="entry-experience__identity"
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.78, 1, 1, 0.94] }}
              transition={{ duration: 1.38, times: [0, 0.3, 0.76, 1], ease }}
            >
              <div className="entry-experience__orbit entry-experience__orbit--outer" />
              <div className="entry-experience__orbit entry-experience__orbit--inner" />
              <span className="entry-experience__large-initial entry-experience__large-initial--s">S</span>
              <span className="entry-experience__large-initial entry-experience__large-initial--m">M</span>
              <span className="entry-experience__registration entry-experience__registration--tl" />
              <span className="entry-experience__registration entry-experience__registration--br" />
            </motion.div>

            <motion.div className="entry-experience__nameplate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -6] }} transition={{ duration: 1.35, delay: 0.2, times: [0, 0.25, 0.78, 1], ease }}>
              <strong>Syed Mustafa</strong><span>Software Engineer</span>
            </motion.div>

            <motion.div
              className="entry-experience__archive entry-experience__archive--compact"
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.96], y: [60, 0, 0, -26] }}
              transition={{ duration: 1.72, delay: 1.12, times: [0, 0.24, 0.78, 1], ease }}
            >
              {projectFolios.map((project, index) => (
                <motion.article
                  className={`entry-mini-folio entry-mini-folio--${index + 1}`}
                  key={project.number}
                  initial={{ opacity: 0, y: 34, rotate: index === 0 ? -2 : index === 2 ? 2 : 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 1.18 + index * 0.12, ease }}
                >
                  <span>{project.number}</span><strong>{project.visual}</strong>
                  <div><b>{project.title}</b><small>{project.discipline}</small></div>
                </motion.article>
              ))}
            </motion.div>

            <motion.p className="entry-experience__phase" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, delay: 1.2, times: [0, 0.2, 0.8, 1] }}>
              Selected engineering systems · 2024—2026
            </motion.p>
          </div>

          <button className="entry-experience__skip" onClick={() => setVisible(false)} type="button">Skip intro</button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
