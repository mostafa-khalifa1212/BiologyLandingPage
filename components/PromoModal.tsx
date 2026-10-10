"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalShell from "@/components/ModalShell";
import { springTransition } from "@/lib/motion";

const ORIENTATIONS = [
  {
    id: "as",
    level: "AS Biology",
    session: "June Session",
    date: "Saturday, October 17th",
    time: "6:00 PM",
    meetLink: "https://meet.google.com/pmk-memj-qsw",
    badgeColor: "bg-sage/15 text-sage",
  },
  {
    id: "a2",
    level: "A2 Biology",
    session: "June Session",
    date: "Wednesday, November 4th",
    time: "3:00 PM",
    meetLink: "https://meet.google.com/zec-cnuq-qde",
    badgeColor: "bg-ink/10 text-ink",
  },
] as const;

const PROMO_STORAGE_KEY = "orientation-june-promo-dismissed";

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
        maxWidth="2xl"
      >
        <div className="text-center">
          <motion.div
            className="mx-auto mb-3 inline-flex rounded-[4px] bg-sage/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
          >
            Upcoming June Session · Free Orientations
          </motion.div>

          <h2
            id="promo-modal-title"
            className="font-heading text-2xl font-bold text-ink sm:text-3xl"
          >
            Free Online Orientations
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm text-ink-medium sm:text-base">
            Meet Mostafa Khalifa, learn about the course structure, and get your
            questions answered — completely free.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {ORIENTATIONS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-[4px] border border-border bg-parchment p-5 shadow-[3px_3px_0_#1A1A14]"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`inline-block rounded-[4px] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${item.badgeColor}`}
                    >
                      {item.level}
                    </span>
                    <span className="font-sans text-[11px] font-medium text-ink-muted">
                      Online Meet
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-ink sm:text-xl">
                    {item.level} Orientation
                  </h3>

                  <div className="mt-4 space-y-2 border-t border-border/60 pt-3">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        When
                      </span>
                      <p className="font-heading text-base font-semibold text-ink">
                        {item.date}
                      </p>
                      <p className="font-sans text-xs font-medium text-ink-medium">
                        at {item.time}
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        Where
                      </span>
                      <p className="text-sm font-medium text-sage">
                        Google Meet (Online)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <motion.a
                    href={item.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-stamp block w-full px-4 py-2.5 text-center font-heading text-sm font-bold cursor-pointer"
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 0, y: 0 }}
                    transition={springTransition}
                    onClick={handleClose}
                  >
                    Join {item.level} Meet 🎥
                  </motion.a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <motion.button
              type="button"
              onClick={handleClose}
              className="btn-stamp-outline px-6 py-2.5 font-heading text-sm font-semibold cursor-pointer"
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
