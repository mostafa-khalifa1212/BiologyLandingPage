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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openRegister } = useRegisterModal();
  const { openCourseRegister } = useCourseRegisterModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/output-onlinepngtools (2).png"
            alt="A2 Biology Logo"
            width={160}
            height={40}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm text-slate-300 transition-colors hover:text-emerald-300"
            >
              {link.label}
            </a>
          ))}
          <motion.button
            type="button"
            onClick={openCourseRegister}
            className="rounded-xl bg-emerald-500 px-5 py-2 font-heading text-sm font-bold text-slate-950"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
          >
            Register for Full Course
          </motion.button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            type="button"
            onClick={openRegister}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white"
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
          >
            Free Notes
          </motion.button>
          <motion.button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-slate-900/80"
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
          >
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-slate-900 p-6 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={springTransition}
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="self-end text-2xl text-slate-400 hover:text-white"
              >
                ×
              </button>
              <ul className="mt-8 flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-heading text-lg text-slate-300 hover:text-emerald-300"
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
                    className="block w-full rounded-xl bg-emerald-500 py-2.5 text-center font-bold text-slate-950"
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
