"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
            className="flex-1 rounded-xl bg-emerald-500 px-6 py-3 text-center font-heading font-bold text-slate-950"
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
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-heading font-semibold text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
          >
            Maybe Later
          </motion.button>
        </div>
      </div>
    </ModalShell>
  );
}
