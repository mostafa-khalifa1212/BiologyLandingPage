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
            className="absolute inset-0 bg-ink/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`relative z-10 w-full ${maxWidthClass[maxWidth]} max-h-[90vh] overflow-y-auto rounded-[4px] border-[1.5px] border-ink bg-cream p-6 sm:p-8`}
            style={{ boxShadow: "5px 5px 0 #1A1A14" }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={springTransition}
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-[4px] p-1 text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
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
  "w-full rounded-[4px] border border-border-strong bg-parchment px-4 py-2.5 text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-sage focus:ring-2 focus:ring-sage/20";

export const labelClassName =
  "mb-1.5 block text-sm font-medium text-ink-medium";

export const optionClassName =
  "flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-border bg-parchment px-3 py-2.5 text-sm text-ink-medium transition-colors hover:border-ink/30 has-[:checked]:border-sage has-[:checked]:bg-sage-bg";
