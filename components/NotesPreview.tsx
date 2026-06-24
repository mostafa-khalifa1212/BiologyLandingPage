"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useRegisterModal } from "@/components/RegisterModal";
import {
  fadeUpVariant,
  springTransition,
  staggerContainer,
} from "@/lib/motion";

type Chapter = {
  id: string;
  number: string;
  title: string;
  topics: string[];
  isFree: boolean;
  span?: "wide" | "tall" | "normal";
};

const CHAPTERS: Chapter[] = [
  {
    id: "ch12",
    number: "Ch12",
    title: "Respiration & Energy",
    topics: ["Glycolysis", "Krebs Cycle", "Electron Transport"],
    isFree: true,
    span: "wide",
  },
  {
    id: "ch13",
    number: "Ch13",
    title: "Photosynthesis",
    topics: ["Light Reactions", "Calvin Cycle", "Limiting Factors"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch14",
    number: "Ch14",
    title: "Homeostasis",
    topics: ["Blood Glucose", "Osmoregulation", "Thermoregulation"],
    isFree: false,
    span: "tall",
  },
  {
    id: "ch15",
    number: "Ch15",
    title: "Coordination",
    topics: ["Nervous System", "Synapses", "Endocrine System"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch16",
    number: "Ch16",
    title: "Inheritance",
    topics: ["Mendelian Genetics", "Dihybrid Crosses", "Sex Linkage"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch17",
    number: "Ch17",
    title: "Selection & Evolution",
    topics: ["Natural Selection", "Speciation", "Hardy-Weinberg"],
    isFree: false,
    span: "wide",
  },
];

function spanClass(span: Chapter["span"]) {
  switch (span) {
    case "wide":
      return "md:col-span-2";
    case "tall":
      return "md:row-span-2";
    default:
      return "";
  }
}

function ChapterCard({
  chapter,
  isHovered,
  onHover,
}: {
  chapter: Chapter;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const { openRegister } = useRegisterModal();

  const handleClick = () => {
    if (chapter.isFree) {
      openRegister();
    }
  };

  return (
    <motion.article
      layout
      variants={fadeUpVariant}
      onHoverStart={() => onHover(chapter.id)}
      onHoverEnd={() => onHover(null)}
      onClick={handleClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 ${spanClass(chapter.span)} ${chapter.isFree ? "" : "cursor-default opacity-80"}`}
      whileHover={{
        scale: chapter.isFree ? 1.02 : 1.01,
        transition: springTransition,
      }}
      animate={{
        borderColor: isHovered
          ? "rgba(52, 211, 153, 0.5)"
          : "rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "inset 0 0 0 1px rgba(52, 211, 153, 0.3), 0 0 30px rgba(16, 185, 129, 0.15)"
          : "none",
      }}
      transition={springTransition}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <span className="font-heading text-sm font-semibold text-emerald-400">
            {chapter.number}
          </span>
          {chapter.isFree ? (
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-300">
              Free
            </span>
          ) : (
            <span className="rounded-full bg-slate-700/50 px-2.5 py-0.5 text-xs font-medium text-slate-400">
              Full Course
            </span>
          )}
        </div>

        <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
          {chapter.title}
        </h3>

        <ul className="mt-4 flex flex-wrap gap-2">
          {chapter.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400"
            >
              {topic}
            </li>
          ))}
        </ul>

        {chapter.isFree && (
          <motion.p
            className="mt-auto pt-6 text-sm font-medium text-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            Click to register &amp; download →
          </motion.p>
        )}
      </div>
    </motion.article>
  );
}

export default function NotesPreview() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { openRegister } = useRegisterModal();

  return (
    <section id="free-notes" className="relative px-4 py-24 sm:px-6">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUpVariant}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400"
          >
            Course Notes Preview
          </motion.p>
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            A2 Biology Chapters
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="mx-auto mt-4 max-w-2xl text-slate-400"
          >
            Explore our syllabus-aligned notes. Chapter 12 on Respiration &amp;
            Energy is available free — register to get your PDF instantly.
          </motion.p>
        </motion.div>

        <LayoutGroup>
          <motion.div
            className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                isHovered={hoveredId === chapter.id}
                onHover={setHoveredId}
              />
            ))}
          </motion.div>
        </LayoutGroup>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
        >
          <motion.button
            type="button"
            onClick={openRegister}
            className="rounded-xl bg-emerald-500 px-8 py-3.5 font-heading font-bold text-slate-950 shadow-lg shadow-emerald-500/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
          >
            Register to Access Free Notes
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
