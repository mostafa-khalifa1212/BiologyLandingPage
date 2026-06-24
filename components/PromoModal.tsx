"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalShell from "@/components/ModalShell";
import { springTransition } from "@/lib/motion";

const ORIENTATION_MEET_LINK = "https://meet.google.com/dyr-zzzc-qbh";
const PROMO_STORAGE_KEY = "orientation-promo-dismissed";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(PROMO_STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(PROMO_STORAGE_KEY, "true");
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="fixed left-4 top-20 md:left-6 md:top-24 z-40 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-950/90 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/10 backdrop-blur-md hover:border-emerald-500/50 hover:bg-slate-900/90 glow-emerald cursor-pointer"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-heading">Free Orientation 🎥</span>
          </motion.button>
        )}
      </AnimatePresence>

      <ModalShell
        isOpen={isOpen}
        onClose={handleClose}
        titleId="promo-modal-title"
        maxWidth="md"
      >
        <div className="text-center">
          <motion.div
            className="mx-auto mb-4 inline-flex rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
          >
            Free Orientation
          </motion.div>

          <h2
            id="promo-modal-title"
            className="font-heading text-2xl font-bold text-white sm:text-3xl"
          >
            Join Our Free Online Orientation
          </h2>

          <p className="mt-4 text-slate-300">
            Meet Mostafa Khalifa, learn about the course structure, and get your
            questions answered — completely free.
          </p>

          <div className="glass mt-6 rounded-xl px-5 py-4 text-left">
            <p className="text-sm text-slate-400">When</p>
            <p className="font-heading text-lg font-semibold text-white">
              Wednesday, July 1st at 7:00 PM
            </p>
            <p className="mt-3 text-sm text-slate-400">Where</p>
            <p className="font-medium text-emerald-400">Google Meet (Online)</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={ORIENTATION_MEET_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-emerald-500 px-6 py-3 text-center font-heading font-bold text-slate-950 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springTransition}
              onClick={handleClose}
            >
              Join Google Meet
            </motion.a>
            <motion.button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-heading font-semibold text-white cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springTransition}
            >
              Maybe Later
            </motion.button>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
