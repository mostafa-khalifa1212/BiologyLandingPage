"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRegisterModal } from "@/components/RegisterModal";
import { useCourseRegisterModal } from "@/components/CourseRegisterModal";
import {
  fadeUpVariant,
  springTransition,
  staggerContainer,
} from "@/lib/motion";

const COURSE_START = new Date("July 7, 2026 12:00:00").getTime();

function FloatingMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{
          x: [0, 80, 40, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-teal-400/15 blur-[100px]"
        animate={{
          x: [0, -70, -30, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-emerald-300/10 blur-[90px]"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

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
      className="glass inline-flex flex-col items-center rounded-2xl px-6 py-4 glow-emerald"
      variants={fadeUpVariant}
    >
      <span className="mb-1 text-xs font-medium uppercase tracking-widest text-emerald-400/80">
        Nov 2026 Course Starts In
      </span>
      <span className="font-heading text-2xl font-bold tabular-nums text-white sm:text-3xl">
        {timeLeft || "—"}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const { openRegister } = useRegisterModal();
  const { openCourseRegister } = useCourseRegisterModal();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        src="/assets/tinywow_HeroBG.webm"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
      <div className="absolute inset-0 mesh-gradient" />
      <FloatingMesh />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUpVariant}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          99% Student Success Rate · A* Results
        </motion.div>

        <motion.h1
          variants={fadeUpVariant}
          className="font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Unlock Your{" "}
          <span className="text-gradient">A*</span>
          <br />
          in AL Biology
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl"
        >
          Register below and get your first chapter notes for free — built by
          Mostafa Khalifa, the teacher behind consecutive A* cohorts.
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            type="button"
            onClick={openCourseRegister}
            className="w-full rounded-2xl bg-emerald-500 px-8 py-4 text-center font-heading text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/25 sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
          >
            Register for Nov 2026 Course
          </motion.button>

          <motion.button
            type="button"
            onClick={openRegister}
            className="glass w-full rounded-2xl px-8 py-4 text-center font-heading text-lg font-semibold text-white sm:w-auto"
            whileHover={{ scale: 1.03, borderColor: "rgba(52, 211, 153, 0.5)" }}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
          >
            Get Free Notes
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="mt-12">
          <CountdownClock />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="h-6 w-6 text-emerald-400/60"
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
