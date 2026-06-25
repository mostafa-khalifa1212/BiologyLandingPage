"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRegisterModal } from "@/components/RegisterModal";
import { useCourseRegisterModal } from "@/components/CourseRegisterModal";
import { springTransition } from "@/lib/motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#free-notes", label: "Free Notes" },
  { href: "#features", label: "Features" },
  { href: "#video-section", label: "Watch My Journey" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openRegister } = useRegisterModal();
  const { openCourseRegister } = useCourseRegisterModal();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setVisible(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ease-in-out bg-[#fef9f5] shadow-sm ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div 
        className="absolute -bottom-[20px] left-0 right-0 h-[40px] pointer-events-none -z-10" 
        style={{ backgroundImage: "url('/assets/cutPaperBottom.avif')", backgroundSize: '100% 100%' }}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex-shrink-1 min-w-0 max-w-[110px] sm:max-w-none">
          <Image
            src="/assets/output-onlinepngtools (2).png"
            alt="A2 Biology Logo"
            width={160}
            height={40}
            className="h-7 w-auto sm:h-8 md:h-10 logo-dark object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-ink-medium transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <motion.button
            type="button"
            onClick={openCourseRegister}
            className="btn-stamp px-5 py-2 text-sm font-bold"
            transition={springTransition}
          >
            Register for Full Course
          </motion.button>
        </nav>

        <div className="flex items-center gap-2 md:hidden flex-shrink-0">
          <motion.button
            type="button"
            onClick={openRegister}
            className="btn-stamp px-2.5 py-1 text-[11px] font-bold whitespace-nowrap"
            transition={springTransition}
          >
            Free Notes
          </motion.button>
          <motion.button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 flex-row items-center justify-center gap-1 rounded-[4px] border border-border bg-parchment-dark/80 flex-shrink-0"
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
          >
            <span className="block h-5 w-0.5 rounded-full bg-ink" />
            <span className="block h-5 w-0.5 rounded-full bg-ink" />
            <span className="block h-5 w-0.5 rounded-full bg-ink" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-parchment p-6 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={springTransition}
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="self-end text-2xl text-ink-muted hover:text-ink"
              >
                ×
              </button>
              <ul className="mt-8 flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-sans text-lg text-ink-medium hover:text-sage"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      openCourseRegister();
                    }}
                    className="btn-stamp block w-full px-5 py-2.5 text-center text-sm font-bold"
                  >
                    Register for Full Course
                  </button>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
