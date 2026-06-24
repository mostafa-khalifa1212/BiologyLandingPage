"use client";

import { motion } from "framer-motion";
import { drawLineVariant } from "@/lib/motion";

/*
 * Hand-drawn SVG doodle elements.
 * All use thin strokes, low opacity, and slight imperfection
 * to create a "human touched this" feel.
 */

type DoodleProps = {
  className?: string;
  color?: string;
  opacity?: number;
};

/* ── Squiggly Underline ── */
export function SquigglyUnderline({
  className = "",
  color = "#1A1A14",
  opacity = 0.25,
}: DoodleProps) {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 120 8"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <motion.path
        d="M2,6 C20,2 40,8 60,4 C80,1 100,7 118,4"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        variants={drawLineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
}

/* ── Doodle Circle (imperfect ellipse) ── */
export function DoodleCircle({
  className = "",
  color = "#fe5400",
  opacity = 0.35,
}: DoodleProps) {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <motion.ellipse
        cx="50"
        cy="20"
        rx="46"
        ry="16"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        variants={drawLineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
}

/* ── Small Star / Asterisk ── */
export function DoodleStar({
  className = "",
  color = "#1A1A14",
  opacity = 0.18,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ opacity }}
    >
      <motion.g
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
      </motion.g>
    </svg>
  );
}

/* ── Looping Arrow ── */
export function DoodleArrow({
  className = "",
  color = "#1A1A14",
  opacity = 0.2,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="60"
      height="40"
      viewBox="0 0 60 40"
      style={{ opacity }}
    >
      <motion.path
        d="M5,30 C10,10 30,5 40,15 C50,25 45,35 55,20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        variants={drawLineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path
        d="M50,18 L55,20 L52,25"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.3 }}
      />
    </svg>
  );
}

/* ── Small Spiral ── */
export function DoodleSpiral({
  className = "",
  color = "#1A1A14",
  opacity = 0.15,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      style={{ opacity }}
    >
      <motion.path
        d="M16,16 C16,12 20,10 22,14 C24,18 20,22 16,22 C10,22 8,16 10,12 C12,6 20,4 24,10"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        variants={drawLineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
}

/* ── Scattered Dots (group of 3–5) ── */
export function ScatteredDots({
  className = "",
  color = "#1A1A14",
  opacity = 0.15,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="40"
      height="30"
      viewBox="0 0 40 30"
      style={{ opacity }}
    >
      <circle cx="8" cy="10" r="2" fill={color} />
      <circle cx="20" cy="5" r="1.5" fill={color} />
      <circle cx="30" cy="12" r="2.5" fill={color} />
      <circle cx="15" cy="22" r="1.8" fill={color} />
      <circle cx="35" cy="25" r="1.5" fill={color} />
    </svg>
  );
}

/* ── Rough Section Divider ── */
export function RoughDivider({
  className = "",
  topColor = "#F5F0E8",
  bottomColor = "#EDE8DC",
}: {
  className?: string;
  topColor?: string;
  bottomColor?: string;
}) {
  return (
    <div className={`section-divider ${className}`}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-[30px] md:h-[40px] block"
      >
        <path
          d="M0,20 C50,35 100,10 200,22 C300,34 400,8 500,18 C600,28 700,12 800,24 C900,36 1000,6 1100,16 C1150,21 1175,25 1200,20 L1200,40 L0,40 Z"
          fill={bottomColor}
        />
        <path
          d="M0,0 L1200,0 L1200,20 C1150,25 1100,10 1000,18 C900,26 800,8 700,16 C600,24 500,10 400,20 C300,30 200,12 100,22 C50,27 25,15 0,20 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}

/* ── Wavy Underline (inline, non-animated) ── */
export function WavyUnderlineSVG({
  color = "#1A1A14",
  opacity = 0.2,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 8"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <path
        d="M2,6 C20,2 40,8 60,4 C80,1 100,7 118,4"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Coil Scribble ── */
export function DoodleCoil({
  className = "",
  color = "#fe5400",
  opacity = 0.25,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="80"
      height="80"
      viewBox="0 0 100 100"
      style={{ opacity }}
    >
      <motion.path
        d="M50,50 C40,40 55,30 65,45 C75,60 40,70 30,55 C20,40 55,20 70,35 C85,50 50,80 35,65 C20,50 60,10 80,25 C100,40 70,90 40,75 C10,60 55,0 85,15"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        variants={drawLineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
}

/* ── Messy Hatching Scribble ── */
export function DoodleHatch({
  className = "",
  color = "#fe5400",
  opacity = 0.25,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="60"
      height="40"
      viewBox="0 0 80 50"
      style={{ opacity }}
    >
      <motion.g
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        variants={drawLineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.path d="M5,15 L35,45" />
        <motion.path d="M15,10 L45,40" />
        <motion.path d="M25,5 L55,35" />
        <motion.path d="M35,2 L65,30" />
        <motion.path d="M45,0 L75,25" />
      </motion.g>
    </svg>
  );
}

/* ── Rough Cross (X Mark) ── */
export function DoodleCross({
  className = "",
  color = "#fe5400",
  opacity = 0.3,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ opacity }}
    >
      <motion.g
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      >
        <motion.line
          x1="4" y1="4" x2="20" y2="20"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        />
        <motion.line
          x1="20" y1="4" x2="4" y2="20"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
      </motion.g>
    </svg>
  );
}

/* ── Rough Checkmark ── */
export function DoodleCheck({
  className = "",
  color = "#fe5400",
  opacity = 0.35,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      style={{ opacity }}
    >
      <motion.path
        d="M4,12 L9,17 L20,6"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
}

/* ── Double Squiggle Underline ── */
export function DoodleDoubleUnderline({
  className = "",
  color = "#fe5400",
  opacity = 0.25,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 120 15"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <motion.g
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      >
        <motion.path
          d="M2,5 C20,2 40,8 60,4 C80,1 100,7 118,4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M5,11 C23,9 43,14 63,10 C83,8 103,13 115,10"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        />
      </motion.g>
    </svg>
  );
}

/* ── Zigzag Scribble ── */
export function DoodleZigzag({
  className = "",
  color = "#fe5400",
  opacity = 0.2,
}: DoodleProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="100"
      height="25"
      viewBox="0 0 100 25"
      style={{ opacity }}
    >
      <motion.path
        d="M5,12 L15,3 L25,22 L35,5 L45,20 L55,2 L65,18 L75,4 L85,21 L95,10"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
    </svg>
  );
}
