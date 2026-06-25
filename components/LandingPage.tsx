"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NotesPreview from "@/components/NotesPreview";
import { RoughDivider, DoodleSpiral, DoodleCoil, DoodleZigzag, DoodleDoubleUnderline, DoodleCross, DoodleCheck, DoodleWaterDrop, DoodleLineScribble, DoodleSmiley, DoodleHeart } from "@/components/Doodles";

const FEATURES = [
  {
    title: "Learning Outcome-Based Notes",
    description:
      "Detailed notes precisely aligned with A2 Biology learning outcomes, ensuring comprehensive syllabus coverage.",
    href: "https://www.cambridgeinternational.org/Images/664560-2025-2027-syllabus.pdf",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    ),
  },
  {
    title: "Exam-Ready Practice",
    description:
      "Extensive practice questions, past paper analysis, and mock exams to build your confidence and exam technique.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    ),
  },
  {
    title: "On-Demand Revision Videos",
    description:
      "Access a library of video lessons anytime, anywhere, perfect for revision and clarifying complex topics.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    ),
  },
] as const;

const CREDENTIALS = [
  "Easy to work with and available 24/7",
  "Worked as an assistant for Dr Nihal Gabr",
  "Long experience teaching biology and breaking down complex concepts",
  "Dentistry Student at Ain Shams University",
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mostafakhalifaaa?igsh=OXc0N25wa29ucG5j",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
  {
    label: "YouTube",
    href: "http://www.youtube.com/@MostafaKhalifaa",
    icon: (
      <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.425 3.5 12 3.5 12 3.5s-7.425 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.147 0 12 0 12s0 3.853.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.575 20.5 12 20.5 12 20.5s7.425 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.853 24 12 24 12s0-3.853-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+201550881126",
    icon: (
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3s.99 2.67 1.13 2.85c.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.17 1.26.15 1.73.09.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
    ),
  },
] as const;
const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const offsets = isMobile ? [0, 0, 0] : [-20, 20, 60];
    return {
      opacity: 1,
      y: offsets[i] || 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 16,
        delay: i * 0.15,
      },
    };
  },
};
const FEATURE_DOODLES = [
  { file: "pencil.avif", classes: "absolute top-8 right-6 w-20 rotate-[15deg] opacity-60 pointer-events-none z-10" },
  { file: "barChart.avif", classes: "absolute top-8 right-6 w-16 opacity-60 pointer-events-none z-10" },
  { file: "improvingGraph.avif", classes: "absolute top-8 right-6 w-24 -rotate-6 opacity-60 pointer-events-none z-10" },
];

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NotesPreview />

        <section id="about" className="relative bg-transparent px-0 py-24 mb-24">
          <div className="grid items-stretch md:grid-cols-5 relative w-full">

            {/* Left Column: Full-Bleed Profile Picture */}
            <div className="w-full h-[350px] sm:h-[450px] md:h-auto md:col-span-2 relative overflow-hidden rounded-t-[4px] md:rounded-t-none md:rounded-l-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-10">
              <Image
                src="/assets/pfp.jpeg"
                alt="Mostafa Khalifa - A2 Biology Tutor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              {/* Crumpled paper texture overlay on photo */}
              <div
                className="absolute inset-0 bg-repeat opacity-[0.06] mix-blend-mode-multiply pointer-events-none z-10"
                style={{ backgroundImage: "url('/assets/crumbledBlackPaperTexture.avif')", backgroundSize: 'cover' }}
              />
            </div>

            {/* Right Column: White Paper Sheet with Features */}
            <div className="w-full md:col-span-3 relative bg-cream p-6 sm:p-8 md:pt-16 md:pb-16 md:pl-16 md:pr-32 lg:pr-48 shadow-[0_-15px_30px_rgba(26,26,20,0.12)] md:shadow-[-15px_0_30px_rgba(26,26,20,0.15)] z-20 -mt-8 md:mt-0 md:-ml-8 rounded-b-[4px] md:rounded-b-none md:rounded-r-[4px] flex flex-col justify-center">
              {/* Horizontal torn top edge down the middle (Mobile only) */}
              <div className="absolute -top-[20px] left-0 right-0 h-[40px] pointer-events-none z-30 block md:hidden" style={{ backgroundImage: "url('/assets/cutPaperTop.avif')", backgroundSize: '100% 100%' }}></div>

              {/* Vertical torn left edge down the middle (Desktop only) */}
              <div className="absolute -left-[20px] top-0 bottom-0 w-[40px] pointer-events-none z-30 hidden md:block" style={{ backgroundImage: "url('/assets/cutPaperLeft.avif')", backgroundSize: '100% 100%' }}></div>

              <div className="relative mb-6 self-start">
                <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
                  Meet Your Teacher
                </h2>
                <DoodleDoubleUnderline className="absolute bottom-[-10px] left-0 right-0 h-3 text-sage" opacity={0.6} />
              </div>

              <p className="mb-6 text-2xl leading-relaxed text-ink-medium font-accent font-medium">
                Hi, I&apos;m Mostafa Khalifa, A2 Biology teacher with a 99%
                student success rate. In November 2024 and June 2025, my
                students and I all achieved <span className="circled-word text-ink">A*</span> in AL Biology. Now I am a
                dentistry student at Ain Shams University Alhamdulillah,
                passionate about helping ambitious people succeed. I created
                this course to share the strategies that worked for us, and to
                help you achieve the A*.
              </p>

              <div className="mb-6 flex justify-center gap-4 md:justify-start">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-ink-muted transition-colors hover:text-sage"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>

              {/* Wiggling Lab Equipment Doodles */}
              <div className="absolute -right-4 top-8 rotate-[15deg] z-30 pointer-events-none w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                <Image src="/assets/labEquipment.avif" alt="" fill className="retro-wiggle-medium object-contain" />
              </div>
              <div className="absolute -left-4 -bottom-8 rotate-[-12deg] z-30 pointer-events-none w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                <Image src="/assets/testTubeRack.avif" alt="" fill className="retro-wiggle-slow object-contain" />
              </div>

              {/* Vintage Lab Equipment Polaroid/Schematic */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block rotate-[4deg] border-4 border-white bg-white p-2 shadow-md z-15 w-44 pointer-events-none">
                <div className="relative aspect-[3/4] w-full bg-[#1A1A14] overflow-hidden">
                  <Image
                    src="/assets/biggerLabEquipment.jfif"
                    alt="Lab Equipment Vintage Illustration"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
                <p className="font-accent text-center text-xs mt-1.5 text-ink-medium select-none">
                  A2 Biology Lab
                </p>
              </div>

              <div className="relative mb-4 self-start">
                <h3 className="font-heading text-2xl font-semibold text-ink">
                  Credentials
                </h3>
                <DoodleCross className="absolute -top-1 -right-8 w-5 h-5 text-sage rotate-12" opacity={0.5} />
              </div>

              <ul className="space-y-2 text-ink-muted">
                {CREDENTIALS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage" />
                    {item === "Worked as an assistant for Dr Nihal Gabr" ? (
                      <>
                        Worked as an assistant for{" "}
                        <a
                          href="https://www.instagram.com/drnihalgabr.bioteam?igsh=Y2dqbTFyM2Nocmpj"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage hover:text-sage-dark font-medium underline decoration-sage/30 underline-offset-4"
                        >
                          Dr Nihal Gabr
                        </a>
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>

              {/* Idea bulb doodle */}
              <div className="absolute -right-4 -bottom-6 pointer-events-none rotate-12 z-30 w-14 h-14 sm:w-22 sm:h-22 lg:w-28 lg:h-28">
                <Image src="/assets/ideaBulb.avif" alt="" fill className="object-contain" />
              </div>
            </div>

          </div>
        </section>

        <section id="features" className="relative bg-paper-grid px-4 py-24 sm:px-6 cut-paper-top cut-paper-bottom mb-24">
          <div className="relative mx-auto max-w-6xl z-20 flex flex-col items-center">
            <div className="relative mb-20">
              <h2 className="font-heading text-center text-3xl font-bold text-ink sm:text-4xl">
                Why Choose This Course?
              </h2>
              <DoodleCoil className="absolute -top-10 -left-12 hidden md:block rotate-[-12deg]" opacity={0.5} />
              <DoodleCheck className="absolute -bottom-8 -right-12 hidden md:block rotate-[15deg] w-8 h-8" opacity={0.6} />
            </div>
            <div className="grid w-full gap-8 md:grid-cols-3 md:gap-10">
              {FEATURES.map((feature, i) => {
                const doodleConfig = FEATURE_DOODLES[i];
                const rotation = i === 0 ? -2 : i === 1 ? 1.5 : -1;
                const bgClass = i === 1 ? "bg-paper-2" : "bg-paper-1";

                // Vary horizontal position and rotation of the black tape
                const tapePositionClass = i === 0
                  ? "top-[15%] -left-[30px] rotate-[-75deg]"
                  : i === 1
                    ? "-top-[14px] left-[65%] rotate-[6deg]"
                    : "top-[20%] -right-[30px] rotate-[75deg]";

                return (
                  <motion.article
                    key={feature.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={cardVariants}
                    className={`relative rounded-[4px] px-8 pt-24 pb-8 text-left shadow-[0_10px_30px_rgba(26,26,20,0.06)] min-h-[580px] flex flex-col ${bgClass}`}
                    style={{ rotate: rotation }}
                  >
                    {/* Offset Black Tape (Varying Position & Rotation) */}
                    <div className={`absolute w-[85px] h-[28px] z-20 pointer-events-none ${tapePositionClass}`}>
                      <Image src="/assets/blackTape.avif" alt="" fill className="object-cover opacity-90" />
                      <span className="absolute inset-0 flex items-center justify-center font-heading text-xs font-bold text-white tracking-widest pt-[2px]">
                        {`0${i + 1}`}
                      </span>
                    </div>

                    {/* Feature Doodle */}
                    <img
                      src={`/assets/${doodleConfig.file}`}
                      className={doodleConfig.classes}
                      alt=""
                    />

                    {i === 2 && (
                      <div className="absolute bottom-6 right-6 w-6 h-7 text-sage rotate-[-15deg] opacity-40 z-10">
                        <DoodleWaterDrop />
                      </div>
                    )}

                    <div className="relative self-start z-10 mb-6 mt-4">
                      <h3 className="font-heading text-3xl font-bold text-ink leading-tight pr-8">
                        {"href" in feature ? (
                          <a
                            href={feature.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-sage"
                          >
                            {feature.title}
                          </a>
                        ) : (
                          feature.title
                        )}
                      </h3>
                      <DoodleLineScribble className="absolute bottom-[-10px] left-0 w-32 h-2 text-sage" opacity={0.6} />
                    </div>

                    <p className="leading-relaxed text-ink-medium text-2xl font-accent font-medium mt-2">
                      {feature.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="video-section" className="relative bg-transparent text-parchment px-4 py-32 sm:px-6">
          {/* Floating Margin Doodles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
            {/* DNA (Left Margin) */}
            <div className="absolute left-[1%] sm:left-[3%] bottom-[12%] rotate-[12deg] w-14 h-14 sm:w-24 sm:h-24 lg:w-30 lg:h-30">
              <Image src="/assets/dna.avif" alt="" fill className="retro-wiggle-medium object-contain" />
            </div>
            {/* Magnifying Glass (Right Margin) */}
            <div className="absolute right-[1%] sm:right-[3%] top-[18%] rotate-[-8deg] w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <Image src="/assets/magnifyingGlass.avif" alt="" fill className="retro-wiggle-fast object-contain" />
            </div>
            {/* White Lightbulb Doodle (Bottom-Right Margin) */}
            <div className="absolute right-[2%] sm:right-[6%] bottom-[8%] rotate-[15deg] w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
              <Image src="/assets/ideaBulb.avif" alt="" fill className="retro-wiggle-slow object-contain" />
            </div>
          </div>

          <div className="relative mx-auto max-w-6xl z-20">
            <div className="relative inline-block mb-12 self-start">
              <h2 className="font-heading text-3xl font-bold text-parchment sm:text-4xl text-center md:text-left">
                How I Got an A* in A2 Biology
              </h2>
              <DoodleSmiley className="absolute -top-8 -right-12 hidden md:block rotate-[15deg] text-sage" opacity={0.6} />
            </div>
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="relative overflow-hidden rounded-[2px] border-4 border-parchment/10 hard-shadow">
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube.com/embed/3lgWLww-jFY"
                  title="How I Got an A* in A2 Biology"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-col justify-center relative">
                <Image src="/assets/whiteLeftArrow.png" alt="" width={60} height={60} className="absolute -left-16 top-0 hidden md:block" />
                <p className="text-2xl leading-relaxed text-parchment/80 font-accent font-medium relative pb-6">
                  In this video, I share my journey and strategies that helped
                  me achieve an A* in A2 Biology. Watch to learn more about my
                  study techniques and tips for success!
                  <DoodleHeart className="absolute -bottom-6 -right-6 hidden md:block rotate-[-12deg] text-sage" opacity={0.5} />
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="relative bg-paper-2 px-4 py-24 sm:px-6 z-0 cut-paper-top">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 grid gap-10 text-center md:grid-cols-3 md:text-left">
            <div>
              <Image
                src="/assets/output-onlinepngtools.png"
                alt="A2 Biology Logo"
                width={180}
                height={60}
                className="logo-dark mx-auto mb-6 h-14 w-auto md:mx-0"
              />
              <p className="text-sm leading-relaxed text-ink-medium font-medium">
                Unlock your A* potential with comprehensive notes, engaging live
                classes, and dedicated support.
              </p>
            </div>
            <div>
              <div className="relative inline-block mb-6">
                <h4 className="font-heading text-xl font-bold text-ink">
                  Connect With Us
                </h4>
                <DoodleHeart className="absolute -top-3 -right-6 w-5 h-5 text-sage rotate-[-15deg]" opacity={0.5} />
              </div>
              <div className="flex justify-center gap-4 md:justify-start">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-ink transition-colors hover:text-sage"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading mb-6 text-xl font-bold text-ink">
                Contact Us
              </h4>
              <p className="mb-2">
                <a
                  href="mailto:mostafakhalifaa1212@gmail.com"
                  className="text-ink-medium font-medium transition-colors hover:text-sage"
                >
                  mostafakhalifaa1212@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+201550881126"
                  className="text-ink-medium font-medium transition-colors hover:text-sage"
                >
                  +20 155 088 1126
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-ink/10 pt-8 text-center text-sm font-medium text-ink-muted flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              &copy; {new Date().getFullYear()} AL Biology | Mostafa Khalifa.
              All Rights Reserved.
            </p>
            <a href="/privacy" className="transition-colors hover:text-ink relative inline-block">
              Privacy Policy
              <DoodleCheck className="absolute -top-2 -right-6 w-4 h-4 text-sage rotate-12" opacity={0.6} />
            </a>
          </div>
        </div>
        <DoodleSpiral className="absolute bottom-8 right-8 hidden md:block rotate-12 opacity-50" />
      </footer>
    </>
  );
}