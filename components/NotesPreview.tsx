"use client";

import { useState } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useRegisterModal } from "@/components/RegisterModal";
import { useCourseRegisterModal } from "@/components/CourseRegisterModal";
import {
  fadeUpVariant,
  springTransition,
  staggerContainer,
} from "@/lib/motion";

type Chapter = {
  id: string;
  number: string;
  title: string;
  brief: string;
  topics: string[];
  isFree: boolean;
  span?: "wide" | "tall" | "normal";
};

const AS_CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    number: "Ch01",
    title: "Cell structure",
    brief: "Discover the micro-architecture of life: microscope types, cell organelles, and the differences between prokaryotic and eukaryotic cells.",
    topics: ["Microscopy", "Organelles", "Prokaryotes vs Eukaryotes"],
    isFree: false,
    span: "wide",
  },
  {
    id: "ch2",
    number: "Ch02",
    title: "Biological molecules",
    brief: "Study the organic chemistry of life: carbohydrates, proteins, lipids, and water, along with key biochemical testing procedures.",
    topics: ["Carbohydrates & Lipids", "Proteins", "Biochemical Tests"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch3",
    number: "Ch03",
    title: "Enzymes",
    brief: "Analyze biological catalysts: mechanisms of enzyme action, factors affecting rate, and how inhibitors regulate enzymes.",
    topics: ["Enzyme Action", "Activation Energy", "Inhibitors"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch4",
    number: "Ch04",
    title: "Cell membrane & Transport",
    brief: "Investigate cell boundaries: the fluid mosaic model, membrane proteins, and mechanisms like diffusion, osmosis, and active transport.",
    topics: ["Fluid Mosaic Model", "Osmosis & Diffusion", "Active Transport"],
    isFree: false,
    span: "tall",
  },
  {
    id: "ch5",
    number: "Ch05",
    title: "The mitotic cell cycle",
    brief: "Follow cell reproduction: chromosome structure, replication phases, and the roles of stem cells and cancer pathways.",
    topics: ["Mitosis", "Chromosome Structure", "Cancer & Stem Cells"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch6",
    number: "Ch06",
    title: "Nucleic acids",
    brief: "Deconstruct the genetic code: DNA/RNA structure, semi-conservative replication, and transcription/translation processes.",
    topics: ["DNA/RNA Structure", "DNA Replication", "Protein Synthesis"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch7",
    number: "Ch07",
    title: "Transport in plants",
    brief: "Learn how plants move water and solutes: xylem and phloem structures, transpiration pull, and phloem translocation.",
    topics: ["Xylem & Phloem", "Transpiration", "Translocation"],
    isFree: false,
    span: "wide",
  },
  {
    id: "ch8",
    number: "Ch08",
    title: "Transport in mammals",
    brief: "Understand mammalian circulation: double-loop heart structure, blood vessels, cardiac cycle, and hemoglobin mechanics.",
    topics: ["Heart & Circulation", "Cardiac Cycle", "Hemoglobin"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch9",
    number: "Ch09",
    title: "Gas exchange",
    brief: "Study respiratory systems: lung anatomy, gas exchange surfaces, and the impacts of smoking and environment on breathing.",
    topics: ["Lungs & Alveoli", "Gas Exchange", "Smoking Impacts"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch10",
    number: "Ch10",
    title: "Infectious diseases",
    brief: "Analyze global pathogens: transmission of cholera, malaria, and tuberculosis, and how antibiotics target bacterial cells.",
    topics: ["Pathogens", "Cholera, Malaria & TB", "Antibiotic Resistance"],
    isFree: false,
    span: "wide",
  },
  {
    id: "ch11",
    number: "Ch11",
    title: "Immunity",
    brief: "Explore immune defenses: non-specific phagocytosis, lymphocyte action, vaccination types, and monoclonal antibodies.",
    topics: ["Phagocytosis", "Lymphocytes", "Vaccines & Antibodies"],
    isFree: false,
    span: "normal",
  },
];

const A2_CHAPTERS: Chapter[] = [
  {
    id: "ch12",
    number: "Ch12",
    title: "Respiration & Energy",
    brief: "Dive deep into the cellular process of generating energy, covering aerobic respiration stages and anaerobic pathways.",
    topics: ["Glycolysis", "Krebs Cycle", "Electron Transport"],
    isFree: true,
    span: "wide",
  },
  {
    id: "ch13",
    number: "Ch13",
    title: "Photosynthesis",
    brief: "Understand how plants harness light energy to synthesize glucose, including light-dependent and light-independent stages.",
    topics: ["Light Reactions", "Calvin Cycle", "Limiting Factors"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch14",
    number: "Ch14",
    title: "Homeostasis",
    brief: "Explore how organisms maintain a constant internal environment, focusing on blood glucose control and temperature regulation.",
    topics: ["Blood Glucose", "Osmoregulation", "Thermoregulation"],
    isFree: false,
    span: "tall",
  },
  {
    id: "ch15",
    number: "Ch15",
    title: "Coordination",
    brief: "Study cell-to-cell communication via the nervous and endocrine systems, from action potentials to hormonal responses.",
    topics: ["Nervous System", "Synapses", "Endocrine System"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch16",
    number: "Ch16",
    title: "Inheritance",
    brief: "Examine genetic transmission, covering monohybrid and dihybrid crosses, codominance, and autosomal linkage.",
    topics: ["Mendelian Genetics", "Dihybrid Crosses", "Sex Linkage"],
    isFree: false,
    span: "normal",
  },
  {
    id: "ch17",
    number: "Ch17",
    title: "Selection & Evolution",
    brief: "Learn how selective pressures drive evolutionary change, speciation, and how to apply the Hardy-Weinberg equation.",
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

const gridVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.25,
    },
  },
};

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
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 ${spanClass(chapter.span)} ${chapter.isFree ? "cursor-pointer" : "cursor-default opacity-85"}`}
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

        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {chapter.brief}
        </p>

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
  const [activeTab, setActiveTab] = useState<"AS" | "A2">("A2");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { openRegister } = useRegisterModal();
  const { openCourseRegister } = useCourseRegisterModal();

  const chaptersToRender = activeTab === "AS" ? AS_CHAPTERS : A2_CHAPTERS;

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
            {activeTab === "AS" ? "AS Biology Chapters" : "A2 Biology Chapters"}
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="mx-auto mt-4 max-w-2xl text-slate-400"
          >
            {activeTab === "AS"
              ? "Comprehensive notes precisely aligned with the Cambridge AS Biology syllabus. All chapters are available in the full course."
              : "Detailed notes precisely aligned with the Cambridge A2 Biology syllabus. Chapter 12 (Respiration & Energy) is free — register to get your PDF instantly."}
          </motion.p>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="relative flex rounded-full bg-slate-900/80 p-1 border border-white/5">
            <button
              onClick={() => setActiveTab("AS")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 font-heading cursor-pointer ${
                activeTab === "AS" ? "text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "AS" && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 bg-emerald-500 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              AS Biology
            </button>
            <button
              onClick={() => setActiveTab("A2")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 font-heading cursor-pointer ${
                activeTab === "A2" ? "text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "A2" && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 bg-emerald-500 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              A2 Biology
            </button>
          </div>
        </div>

        <LayoutGroup>
          <div className="overflow-hidden py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
              >
                {chaptersToRender.map((chapter) => (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    isHovered={hoveredId === chapter.id}
                    onHover={setHoveredId}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </LayoutGroup>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
        >
          {activeTab === "A2" ? (
            <motion.button
              type="button"
              onClick={openRegister}
              className="rounded-xl bg-emerald-500 px-8 py-3.5 font-heading font-bold text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
            >
              Register to Access Free Notes
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={openCourseRegister}
              className="rounded-xl bg-emerald-500 px-8 py-3.5 font-heading font-bold text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
            >
              Register for Full AS Course
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
