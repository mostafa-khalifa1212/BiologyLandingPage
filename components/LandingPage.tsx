import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NotesPreview from "@/components/NotesPreview";

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
    href: "https://www.instagram.com/mostafa_khalifabio?igsh=OXc0N25wa29ucG5j",
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

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NotesPreview />

        <section id="about" className="bg-slate-950 px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
              Meet Your Teacher
            </h2>
            <div className="grid items-center gap-10 md:grid-cols-5 md:gap-12">
              <div className="md:col-span-2">
                <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-emerald-500/30 shadow-2xl glow-emerald md:h-72 md:w-72">
                  <Image
                    src="/assets/pfp.jpg"
                    alt="Mostafa Khalifa - A2 Biology Tutor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 288px"
                  />
                </div>
              </div>
              <div className="text-center md:col-span-3 md:text-left">
                <p className="mb-6 text-lg leading-relaxed text-slate-300">
                  Hi, I&apos;m Mostafa Khalifa, A2 Biology teacher with a 99%
                  student success rate. In November 2024 and June 2025, my
                  students and I all achieved A* in AL Biology. Now I am a
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
                      className="text-emerald-400 transition-colors hover:text-emerald-300"
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
                <h3 className="font-heading mb-4 text-2xl font-semibold text-white">
                  Credentials
                </h3>
                <ul className="space-y-2 text-slate-400">
                  {CREDENTIALS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      {item === "Worked as an assistant for Dr Nihal Gabr" ? (
                        <>
                          Worked as an assistant for{" "}
                          <a
                            href="https://www.instagram.com/drnihalgabr.bioteam?igsh=Y2dqbTFyM2Nocmpj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300"
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
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative px-4 py-24 sm:px-6">
          <div className="absolute inset-0 mesh-gradient opacity-30" />
          <div className="relative mx-auto max-w-6xl">
            <h2 className="font-heading mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
              Why Choose This Course?
            </h2>
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="glass group rounded-2xl p-8 text-center transition-colors hover:border-emerald-500/30"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-10 w-10"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="font-heading mb-3 text-xl font-semibold text-white">
                    {"href" in feature ? (
                      <a
                        href={feature.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-emerald-300"
                      >
                        {feature.title}
                      </a>
                    ) : (
                      feature.title
                    )}
                  </h3>
                  <p className="leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="video-section" className="bg-slate-950 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading mb-8 text-3xl font-bold text-white sm:text-4xl">
              How I Got an A* in A2 Biology
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube.com/embed/3lgWLww-jFY"
                  title="How I Got an A* in A2 Biology"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-lg leading-relaxed text-slate-300">
                  In this video, I share my journey and strategies that helped
                  me achieve an A* in A2 Biology. Watch to learn more about my
                  study techniques and tips for success!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/5 bg-black px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-10 text-center md:grid-cols-3 md:text-left">
            <div>
              <Image
                src="/assets/output-onlinepngtools.png"
                alt="A2 Biology Logo"
                width={180}
                height={60}
                className="mx-auto mb-4 h-14 w-auto md:mx-0"
              />
              <p className="text-sm leading-relaxed text-slate-500">
                Unlock your A* potential with comprehensive notes, engaging live
                classes, and dedicated support.
              </p>
            </div>
            <div>
              <h4 className="font-heading mb-4 text-lg font-semibold text-white">
                Connect With Us
              </h4>
              <div className="flex justify-center gap-4 md:justify-start">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-slate-500 transition-colors hover:text-emerald-400"
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
              <h4 className="font-heading mb-4 text-lg font-semibold text-white">
                Contact Us
              </h4>
              <p className="mb-1">
                <a
                  href="mailto:mostafakhalifaa1212@gmail.com"
                  className="text-slate-500 transition-colors hover:text-emerald-400"
                >
                  mostafakhalifaa1212@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+201550881126"
                  className="text-slate-500 transition-colors hover:text-emerald-400"
                >
                  +20 155 088 1126
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-sm text-slate-600">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} A2 Biology | Mostafa Khalifa.
              All Rights Reserved.
            </p>
            <a href="/privacy" className="transition-colors hover:text-slate-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
