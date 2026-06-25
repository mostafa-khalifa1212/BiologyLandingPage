"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRegisterModal } from "@/components/RegisterModal";
import { useCourseRegisterModal } from "@/components/CourseRegisterModal";
import {
  fadeUpVariant,
  springTransition,
  staggerContainer,
} from "@/lib/motion";
import {
  DoodleCoil,
  DoodleHatch,
  DoodleCircle,
  DoodleZigzag,
  DoodleDoubleUnderline,
  DoodleCheck,
  DoodleSmiley,
  DoodleHeart,
  DoodleLineScribble,
  DoodleArrow,
  DoodleSpiral,
} from "@/components/Doodles";

const COURSE_START = new Date("July 7, 2026 12:00:00").getTime();

function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const distance = COURSE_START - now;

      if (distance < 0) {
        setTimeLeft("Classes are live!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-cream border-[1.5px] border-ink rounded-[4px] inline-flex flex-col items-center px-6 py-4"
      style={{ boxShadow: '5px 5px 0 #1A1A14' }}
      variants={fadeUpVariant}
    >
      <span className="mb-1 text-xs font-medium uppercase tracking-widest text-ink-muted">
        Nov 2026 Course Starts In
      </span>
      <span className="font-heading text-2xl font-bold tabular-nums text-ink sm:text-3xl">
        {timeLeft || "—"}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const { openRegister } = useRegisterModal();
  const { openCourseRegister } = useCourseRegisterModal();
  const paperBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paperBg = paperBgRef.current;
    if (!paperBg) return;

    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportH = window.innerHeight || 800;

        // Progress goes from 0 (at top of page) to 1 (when scrolled by 1 viewport height)
        const progress = Math.min(1, scrollY / viewportH);

        // Gradually crop background up to 12% on each side
        const cropX = progress * 12;

        paperBg.style.clipPath = `inset(0px ${cropX}% 0px ${cropX}%)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[95vh] items-center justify-center overflow-visible bg-transparent px-4 pt-36 sm:pt-44 pb-32 mb-24"
    >
      {/* Subtle paper background sheet that shrinks/crops */}
      <div
        ref={paperBgRef}
        className="absolute inset-0 bg-paper-1 cut-paper-bottom z-0"
        style={{ clipPath: "inset(0px 0% 0px 0%)" }}
      >
        {/* Accent paper texture 3 overlay (very subtle) */}
        <div
          className="absolute inset-0 bg-repeat opacity-[0.06] mix-blend-mode-multiply pointer-events-none"
          style={{ backgroundImage: "url('/assets/paperTexture3.avif')", backgroundSize: '600px 600px' }}
        />
      </div>

      {/* Floating Doodles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {/* Rocket: Inverted and wiggling */}
        <div className="absolute right-[10%] top-[15%] hidden lg:block rotate-[20deg]">
          <Image src="/assets/rocket.avif" alt="" width={100} height={100} className="retro-wiggle-slow invert" />
        </div>
        
        {/* Improving Graph: Inverted and wiggling */}
        <div className="absolute left-[8%] bottom-[25%] hidden lg:block rotate-[3deg]">
          <Image src="/assets/improvingGraph.avif" alt="" width={150} height={150} className="retro-wiggle-medium invert" />
        </div>

        {/* Black Top Right Arrow: Inverted and wiggling */}
        <div className="absolute left-[20%] bottom-[35%] hidden lg:block">
          <Image src="/assets/blackTopRightArrow.avif" alt="" width={50} height={50} className="retro-wiggle-fast invert" />
        </div>

        {/* Microscope: New, wiggling */}
        <div className="absolute left-[5%] top-[25%] hidden lg:block rotate-[-10deg]">
          <Image src="/assets/microscope.avif" alt="" width={120} height={120} className="retro-wiggle-slow" />
        </div>

        {/* Atom: New, wiggling */}
        <div className="absolute right-[5%] top-[40%] hidden lg:block rotate-[15deg]">
          <Image src="/assets/atom.avif" alt="" width={110} height={110} className="retro-wiggle-fast" />
        </div>

        {/* Yellow Light Bulb: New, colored, wiggling */}
        <div className="absolute right-[15%] bottom-[20%] hidden lg:block rotate-[-8deg]">
          <Image src="/assets/yellowLightBulb.avif" alt="" width={115} height={115} className="retro-wiggle-medium" />
        </div>
      </div>

      <motion.div
        className="white-shadow-bg relative z-20 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUpVariant}
          className="font-heading relative text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl lg:text-8xl"
        >
          <DoodleCoil className="absolute -top-12 -left-12 hidden md:block rotate-[-15deg] w-16 h-16" opacity={0.6} />
          Unlock Your{" "}
          <span className="circled-word text-sage z-0 relative inline-block">
            <span className="relative z-10">A*</span>
            <DoodleCircle className="absolute inset-0 w-full h-full pointer-events-none scale-125" opacity={0.75} />
          </span>
          <br />
          in AL Biology
          <DoodleLineScribble className="absolute -bottom-2 left-1/3 right-1/3 h-2 text-sage" opacity={0.6} />
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="mx-auto mt-8 max-w-2xl text-2xl text-ink-medium font-accent font-medium"
        >
          Oh hey!! Look who's here, Biology AL is hard yea? well not anymore.
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Decorative Arrows near CTAs */}
          <div className="absolute -left-4 -top-8 hidden sm:block pointer-events-none -rotate-12">
            <Image src="/assets/blackBottomRightArrow.svg" alt="" width={40} height={40} className="retro-wiggle-slow" />
          </div>
          <div className="absolute -right-12 top-2 hidden lg:block pointer-events-none rotate-[12deg]">
            <Image src="/assets/pointingFinger.avif" alt="" width={60} height={60} className="retro-wiggle-medium invert" />
          </div>
          {/* Orange Pencil Doodles */}
          <DoodleArrow className="absolute left-[35%] -top-16 hidden lg:block rotate-[45deg] text-sage w-12 h-12" opacity={0.7} />
          <DoodleSpiral className="absolute right-[20%] -bottom-12 hidden lg:block rotate-12 text-sage w-10 h-10" opacity={0.4} />
          <DoodleZigzag className="absolute -bottom-10 right-4 hidden md:block rotate-6" opacity={0.3} />

          <motion.button
            type="button"
            onClick={openCourseRegister}
            className="btn-stamp w-full py-4 text-center text-lg font-bold sm:w-auto"
            transition={springTransition}
          >
            Register for Nov 2026 Course
          </motion.button>

          <div className="relative w-full sm:w-auto">
            <DoodleHeart className="absolute -bottom-6 -right-6 hidden md:block rotate-[15deg]" opacity={0.6} />
            <motion.button
              type="button"
              onClick={openRegister}
              className="btn-stamp-outline w-full py-4 text-center text-lg font-bold"
              transition={springTransition}
            >
              Get Free Notes
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="mt-14 relative inline-block">
          <DoodleHatch className="absolute -top-8 -left-12 hidden md:block -rotate-12" opacity={0.4} />
          <DoodleCheck className="absolute -bottom-6 -right-10 hidden md:block rotate-12" opacity={0.5} />
          <CountdownClock />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[80px] left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="h-6 w-6 text-ink-muted/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
