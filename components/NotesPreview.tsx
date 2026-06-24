"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRegisterModal } from "@/components/RegisterModal";
import { useCourseRegisterModal } from "@/components/CourseRegisterModal";

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

const CARD_CONFIGS = [
  { 
    bgClass: "bg-paper-1", 
    tapeRot: -1.5, 
    doodle: "pencil.avif", 
    rot: 0, 
    doodleClasses: "bottom-12 right-6 w-24 rotate-[45deg]",
    sideRot: -10,
    sideXOffset: -15,
    sideYOffset: 30
  },
  { 
    bgClass: "bg-paper-2", 
    tapeRot: 2, 
    doodle: "ideaBulb.avif", 
    rot: 0.5, 
    doodleClasses: "bottom-12 right-6 w-20",
    sideRot: -4,
    sideXOffset: 15,
    sideYOffset: 15
  },
  { 
    bgClass: "bg-paper-1", 
    tapeRot: -0.5, 
    doodle: "barChart.avif", 
    rot: -0.8, 
    doodleClasses: "bottom-12 right-6 w-16 -rotate-3",
    sideRot: 6,
    sideXOffset: -5,
    sideYOffset: -10
  },
  { 
    bgClass: "bg-paper-1", 
    tapeRot: 1.8, 
    doodle: "rocket.avif", 
    rot: 0.4, 
    doodleClasses: "bottom-12 right-6 w-24 rotate-[20deg]",
    sideRot: -2,
    sideXOffset: 10,
    sideYOffset: -25
  },
  { 
    bgClass: "bg-paper-2", 
    tapeRot: -2.5, 
    doodle: "improvingGraph.avif", 
    rot: -0.6, 
    doodleClasses: "bottom-12 right-6 w-32 -rotate-3",
    sideRot: 5,
    sideXOffset: -10,
    sideYOffset: -45
  },
];

const getResponsiveConfig = (width: number) => {
  if (width >= 1024) {
    return {
      sideX: -360,
      sideY: 20,
      sideScale: 0.85,
      activeScale: 1.0,
    };
  } else if (width >= 768) {
    return {
      sideX: -260,
      sideY: 15,
      sideScale: 0.75,
      activeScale: 0.9,
    };
  } else {
    return {
      sideX: -100,
      sideY: 10,
      sideScale: 0.6,
      activeScale: 0.75,
    };
  }
};

export default function NotesPreview() {
  const [activeTab, setActiveTab] = useState<"AS" | "A2">("A2");
  const { openRegister } = useRegisterModal();
  const { openCourseRegister } = useCourseRegisterModal();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dragHintRef = useRef<HTMLDivElement>(null);

  const chaptersToRender = activeTab === "AS" ? AS_CHAPTERS : A2_CHAPTERS;

  // Clear out the refs when changing tabs so we don't hold stale DOM nodes
  cardsRef.current = [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const viewH = window.innerHeight;
        const width = window.innerWidth;
        
        let progress = 0;
        if (rect.top <= 0) {
          progress = Math.min(1, -rect.top / (sectionH - viewH));
        }

        // Fade out the drag hint quickly
        if (dragHintRef.current) {
          const dragOpacity = Math.max(0, 1 - progress / 0.15);
          dragHintRef.current.style.opacity = String(dragOpacity);
          dragHintRef.current.style.visibility = dragOpacity === 0 ? "hidden" : "visible";
        }

        const totalCards = 5;
        const respConfig = getResponsiveConfig(width);

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const cardConfig = CARD_CONFIGS[i];
          
          const cardStart = i / totalCards;
          const cardEnd = (i + 1) / totalCards;
          const cardProg = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));

          // Smooth step easing
          const easeT = cardProg * cardProg * (3 - 2 * cardProg);

          // Calculate offset target based on screen width
          const targetX = respConfig.sideX + cardConfig.sideXOffset * (width < 768 ? 0.4 : 1.0);
          const targetY = respConfig.sideY + cardConfig.sideYOffset * (width < 768 ? 0.4 : 1.0);

          const currentX = 0 + easeT * (targetX - 0);
          const currentY = (i * 12) + easeT * (targetY - (i * 12));
          const currentScale = respConfig.activeScale + easeT * (respConfig.sideScale - respConfig.activeScale);
          const currentRot = cardConfig.rot + easeT * (cardConfig.sideRot - cardConfig.rot);

          // Manage z-indices dynamically to keep stack order correct
          let zIndex = 30 - i;
          if (cardProg > 0 && cardProg < 1) {
            zIndex = 100;
          } else if (cardProg === 1) {
            zIndex = 10 + i;
          }

          card.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale}) rotate(${currentRot}deg)`;
          card.style.zIndex = String(zIndex);
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [activeTab]);

  return (
    <>
      <section ref={sectionRef} id="free-notes" className="relative h-[400vh] w-full bg-dotty paper-texture cut-paper-top">
        {/* Sticky Scroll Container */}
        <div className="sticky top-0 h-[100vh] w-full flex flex-col items-center overflow-hidden z-10 pt-[12vh]">
          
          {/* Header content */}
          <div className="w-full px-4 max-w-6xl text-center flex-shrink-0 relative z-50 pointer-events-auto">
            <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-ink-muted">
              Course Notes Preview
            </p>
            <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
              {activeTab === "AS" ? "AS Biology Chapters" : "A2 Biology Chapters"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-muted text-sm sm:text-base">
              {activeTab === "AS"
                ? "Comprehensive notes precisely aligned with the Cambridge AS Biology syllabus."
                : "Detailed notes precisely aligned with the Cambridge A2 Biology syllabus. Chapter 12 is free."}
            </p>

            {/* Tab Toggle */}
            <div className="mt-6 flex justify-center">
              <div className="relative flex rounded-[4px] bg-cream p-1 border-[1.5px] border-ink shadow-[3px_3px_0_#1A1A14]">
                <button
                  onClick={() => setActiveTab("AS")}
                  className={`relative z-10 px-6 py-2.5 rounded-[2px] text-sm font-semibold transition-colors duration-300 font-heading cursor-pointer ${
                    activeTab === "AS" ? "text-parchment" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {activeTab === "AS" && (
                    <motion.span
                      layoutId="active-tab"
                      className="absolute inset-0 bg-ink rounded-[2px] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  AS Biology
                </button>
                <button
                  onClick={() => setActiveTab("A2")}
                  className={`relative z-10 px-6 py-2.5 rounded-[2px] text-sm font-semibold transition-colors duration-300 font-heading cursor-pointer ${
                    activeTab === "A2" ? "text-parchment" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {activeTab === "A2" && (
                    <motion.span
                      layoutId="active-tab"
                      className="absolute inset-0 bg-ink rounded-[2px] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  A2 Biology
                </button>
              </div>
            </div>
          </div>

          {/* Card Stack Container */}
          <div className="relative w-[90vw] max-w-[480px] aspect-[3/4] mt-8 sm:mt-12 flex-shrink-0 white-shadow-bg">
            {/* Paperclip */}
            <img src="/assets/paperClip.avif" className="absolute -top-[20px] right-[40px] w-[40px] sm:w-[48px] z-[100] pointer-events-none" alt="" />
            
            <div className="card-stack relative w-full h-full z-10 perspective-1000">
              {chaptersToRender.slice(0, 5).map((chapter, i) => {
                const config = CARD_CONFIGS[i];
                const zIndex = 50 - i * 10;
                
                return (
                  <div 
                    key={chapter.id}
                    ref={(el) => { cardsRef.current[i] = el; }}
                    className={`note-card absolute inset-0 rounded-[4px] ${config.bgClass} flex flex-col overflow-hidden shadow-[0_10px_30px_rgba(26,26,20,0.08)]`}
                    style={{ zIndex }}
                  >
                    <img src="/assets/cutPaperTop.avif" className="absolute -top-[2px] left-0 w-full h-[40px] object-fill z-[2] pointer-events-none" alt="" />
                    
                    <img 
                      src="/assets/blackTape.avif" 
                      className="absolute top-[16px] left-1/2 w-[70px] h-[22px] object-cover z-[3] opacity-85 pointer-events-none" 
                      style={{ transform: `translateX(-50%) rotate(${config.tapeRot}deg)` }}
                      alt="" 
                    />

                    <div className="relative z-10 pt-[55px] sm:pt-[70px] px-[20px] sm:px-[36px] pb-[32px] sm:pb-[48px] h-full flex flex-col gap-2 sm:gap-3">
                      <div className="flex justify-between items-center relative z-20">
                        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
                          {chapter.number}
                        </span>
                        {chapter.isFree ? (
                          <span className="rounded-[4px] bg-sage/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-sage">
                            Free
                          </span>
                        ) : (
                          <span className="rounded-[4px] border border-border bg-ink/5 px-2.5 py-0.5 text-xs font-medium text-ink-muted">
                            Full Course
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink leading-[1.15] relative z-20">
                        {chapter.title}
                      </h3>
                      
                      <p className="font-sans text-[14px] sm:text-[15px] text-ink-medium leading-[1.65] mt-1 pr-12 relative z-20">
                        {chapter.brief}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-2 relative z-20">
                        {chapter.topics.map((topic) => (
                          <li
                            key={topic}
                            className="rounded-[4px] bg-ink/5 px-2.5 py-1 text-xs text-ink-muted"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>

                      {/* Doodle */}
                      <img 
                        src={`/assets/${config.doodle}`} 
                        className={`absolute pointer-events-none opacity-90 z-10 ${config.doodleClasses}`} 
                        alt="" 
                      />

                      {/* AND MORE text for the 5th card */}
                      {i === 4 && (
                        <div className="mt-auto pt-6 text-center font-heading text-lg font-bold text-ink-muted opacity-60 relative z-20">
                          AND MORE...
                        </div>
                      )}
                    </div>
                    
                    <img src="/assets/cutPaperBottomClean.avif" className="absolute -bottom-[2px] left-0 w-full h-[40px] object-fill z-[2] pointer-events-none" alt="" />
                  </div>
                );
              })}
            </div>

            <div ref={dragHintRef} className="absolute -bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none transition-all duration-200">
              <img src="/assets/dragToSee.avif" className="w-24 opacity-80" alt="Scroll to see more" />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-parchment-dark py-16 flex justify-center relative z-20 paper-texture cut-paper-bottom mb-24">
        {activeTab === "A2" ? (
          <button
            type="button"
            onClick={openRegister}
            className="btn-stamp"
          >
            Register to Access Free Notes
          </button>
        ) : (
          <button
            type="button"
            onClick={openCourseRegister}
            className="btn-stamp"
          >
            Register for Full AS Course
          </button>
        )}
      </div>
    </>
  );
}
