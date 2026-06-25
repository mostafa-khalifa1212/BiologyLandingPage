"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalShell from "@/components/ModalShell";
import { springTransition } from "@/lib/motion";

const ORIENTATION_MEET_LINK = "https://meet.google.com/dyr-zzzc-qbh";
const PROMO_STORAGE_KEY = "orientation-promo-dismissed";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(PROMO_STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            className={`fixed left-4 md:left-6 z-40 flex items-center gap-2 rounded-[4px] border-[1.5px] border-ink bg-parchment px-3.5 py-2 font-sans text-xs font-bold text-ink cursor-pointer transition-all duration-300 ease-in-out hover:-translate-x-px hover:-translate-y-px ${
              headerVisible ? "top-[115px] md:top-28" : "top-4 md:top-6"
            }`}
            style={{ boxShadow: "3px 3px 0 #1A1A14" }}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
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
            className="mx-auto mb-4 inline-flex rounded-[4px] bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
          >
            Free Orientation
          </motion.div>

          <h2
            id="promo-modal-title"
            className="font-heading text-2xl font-bold text-ink sm:text-3xl"
          >
            Join Our Free Online Orientation
          </h2>

          <p className="mt-4 text-ink-medium">
            Meet Mostafa Khalifa, learn about the course structure, and get your
            questions answered — completely free.
          </p>

          <div className="mt-6 rounded-[4px] border border-border bg-parchment px-5 py-4 text-left">
            <p className="text-sm text-ink-muted">When</p>
            <p className="font-heading text-lg font-semibold text-ink">
              Wednesday, July 1st at 7:00 PM
            </p>
            <p className="mt-3 text-sm text-ink-muted">Where</p>
            <p className="font-medium text-sage">Google Meet (Online)</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={ORIENTATION_MEET_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stamp flex-1 px-6 py-3 text-center font-heading font-bold cursor-pointer hover:bg-sage hover:text-parchment active:bg-sage-dark transition-colors duration-200"
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 0, y: 0 }}
              transition={springTransition}
              onClick={handleClose}
            >
              Join Google Meet
            </motion.a>
            <motion.button
              type="button"
              onClick={handleClose}
              className="btn-stamp-outline flex-1 px-6 py-3 font-heading font-semibold cursor-pointer"
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 0, y: 0 }}
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
