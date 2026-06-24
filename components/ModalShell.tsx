"use client";

import { AnimatePresence, motion } from "framer-motion";
import { springTransition } from "@/lib/motion";
import type { ReactNode } from "react";

type ModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
  maxWidth?: "md" | "lg";
};

const maxWidthClass = {
  md: "max-w-md",
  lg: "max-w-lg",
};

export default function ModalShell({
  isOpen,
  onClose,
  titleId,
  children,
  maxWidth = "md",
}: ModalShellProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close modal overlay"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`glass-strong relative z-10 w-full ${maxWidthClass[maxWidth]} max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 glow-emerald`}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={springTransition}
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const inputClassName =
  "w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20";

export const labelClassName =
  "mb-1.5 block text-sm font-medium text-slate-300";

export const optionClassName =
  "flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/5 bg-slate-900/40 px-3 py-2.5 text-sm text-slate-300 transition-colors hover:border-emerald-500/30 has-[:checked]:border-emerald-500/40 has-[:checked]:bg-emerald-500/10";
