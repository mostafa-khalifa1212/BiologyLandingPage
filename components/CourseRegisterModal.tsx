"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import ModalShell, {
  inputClassName,
  labelClassName,
  optionClassName,
} from "@/components/ModalShell";
import { springTransition } from "@/lib/motion";

type CourseRegisterContextValue = {
  openCourseRegister: () => void;
  closeCourseRegister: () => void;
  isOpen: boolean;
};

const CourseRegisterContext = createContext<CourseRegisterContextValue | null>(
  null
);

export function useCourseRegisterModal(): CourseRegisterContextValue {
  const context = useContext(CourseRegisterContext);
  if (!context) {
    throw new Error(
      "useCourseRegisterModal must be used within CourseRegisterProvider"
    );
  }
  return context;
}

type CourseRegisterProviderProps = {
  children: ReactNode;
};

export function CourseRegisterProvider({ children }: CourseRegisterProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openCourseRegister = useCallback(() => setIsOpen(true), []);
  const closeCourseRegister = useCallback(() => setIsOpen(false), []);

  return (
    <CourseRegisterContext.Provider
      value={{ openCourseRegister, closeCourseRegister, isOpen }}
    >
      {children}
      <CourseRegisterModal isOpen={isOpen} onClose={closeCourseRegister} />
    </CourseRegisterContext.Provider>
  );
}

type CourseRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = "idle" | "submitting" | "success" | "error";

const COURSE_OPTIONS = ["AS Biology Cambridge", "A2 Biology Cambridge"] as const;
const SESSION_OPTIONS = ["November 2026", "June 2027"] as const;
const GRADE_OPTIONS = ["11", "12"] as const;
const RETAKE_OPTIONS = ["No, First time", "Yes, retake💔"] as const;
const PREFERENCE_OPTIONS = ["Online", "On Ground (Madinet Nasr)"] as const;

function CourseRegisterModal({ isOpen, onClose }: CourseRegisterModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [courses, setCourses] = useState<string[]>([]);
  const [session, setSession] = useState("");
  const [grade, setGrade] = useState("");
  const [retake, setRetake] = useState("");
  const [preference, setPreference] = useState("");

  const resetForm = () => {
    setFormState("idle");
    setErrorMessage("");
    setConsent(false);
    setCourses([]);
    setSession("");
    setGrade("");
    setRetake("");
    setPreference("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const toggleCourse = (course: string) => {
    setCourses((prev) =>
      prev.includes(course)
        ? prev.filter((item) => item !== course)
        : [...prev, course]
    );
  };

  const isFormValid =
    consent &&
    courses.length > 0 &&
    session &&
    grade &&
    retake &&
    preference;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      course: courses,
      session,
      studentFullName: String(formData.get("studentFullName") ?? "").trim(),
      studentPhoneNumber: String(formData.get("studentPhoneNumber") ?? "").trim(),
      studentEmail: String(formData.get("studentEmail") ?? "").trim(),
      parentPhoneNumber: String(formData.get("parentPhoneNumber") ?? "").trim(),
      school: String(formData.get("school") ?? "").trim(),
      preference,
      grade,
      retake,
    };

    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/register-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? `Server error: ${response.status}`);
      }

      setFormState("success");
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      titleId="course-register-modal-title"
      maxWidth="lg"
    >
      {formState === "success" ? (
        <motion.div
          className="py-4 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-sage">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="course-register-modal-title" className="font-heading text-2xl font-bold text-ink">
            Registration Complete!
          </h2>
          <p className="mt-3 text-ink-medium">
            Thank you for registering for the full course. We&apos;ll be in touch
            shortly with next steps.
          </p>
          <motion.button
            type="button"
            onClick={handleClose}
            className="btn-stamp mt-6 w-full px-6 py-3 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
          >
            Done
          </motion.button>
        </motion.div>
      ) : (
        <>
          <h2
            id="course-register-modal-title"
            className="font-heading pr-8 text-center text-2xl font-bold text-ink sm:text-3xl"
          >
            Register for Full Course
          </h2>
          <p className="mb-6 mt-2 text-center text-sm text-ink-muted sm:text-base">
            Complete the form below to secure your spot in the upcoming session.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <fieldset>
              <legend className={labelClassName}>Course *</legend>
              <div className="space-y-2">
                {COURSE_OPTIONS.map((course) => (
                  <label key={course} className={optionClassName}>
                    <input
                      type="checkbox"
                      checked={courses.includes(course)}
                      onChange={() => toggleCourse(course)}
                      className="h-4 w-4 rounded border-border bg-parchment text-sage focus:ring-sage/30"
                    />
                    {course}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClassName}>Session *</legend>
              <div className="space-y-2">
                {SESSION_OPTIONS.map((option) => (
                  <label key={option} className={optionClassName}>
                    <input
                      type="radio"
                      name="session"
                      value={option}
                      checked={session === option}
                      onChange={() => setSession(option)}
                      required
                      className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="studentFullName" className={labelClassName}>
                Student&apos;s Full Name *
              </label>
              <input
                id="studentFullName"
                name="studentFullName"
                type="text"
                required
                autoComplete="name"
                placeholder="Student's full name"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="studentPhoneNumber" className={labelClassName}>
                Student&apos;s Phone Number *
              </label>
              <input
                id="studentPhoneNumber"
                name="studentPhoneNumber"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+20 XXX XXX XXXX"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="studentEmail" className={labelClassName}>
                Student&apos;s Email *
              </label>
              <input
                id="studentEmail"
                name="studentEmail"
                type="email"
                required
                autoComplete="email"
                placeholder="student@example.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="parentPhoneNumber" className={labelClassName}>
                Parent&apos;s Phone Number *
              </label>
              <input
                id="parentPhoneNumber"
                name="parentPhoneNumber"
                type="tel"
                required
                placeholder="+20 XXX XXX XXXX"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="school" className={labelClassName}>
                School *
              </label>
              <input
                id="school"
                name="school"
                type="text"
                required
                placeholder="Your school name"
                className={inputClassName}
              />
            </div>

            <fieldset>
              <legend className={labelClassName}>Preference *</legend>
              <div className="space-y-2">
                {PREFERENCE_OPTIONS.map((option) => (
                  <label key={option} className={optionClassName}>
                    <input
                      type="radio"
                      name="preference"
                      value={option}
                      checked={preference === option}
                      onChange={() => setPreference(option)}
                      required
                      className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClassName}>Grade *</legend>
              <div className="flex gap-3">
                {GRADE_OPTIONS.map((option) => (
                  <label key={option} className={`${optionClassName} flex-1 justify-center`}>
                    <input
                      type="radio"
                      name="grade"
                      value={option}
                      checked={grade === option}
                      onChange={() => setGrade(option)}
                      required
                      className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                    />
                    Grade {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClassName}>Retake? *</legend>
              <div className="space-y-2">
                {RETAKE_OPTIONS.map((option) => (
                  <label key={option} className={optionClassName}>
                    <input
                      type="radio"
                      name="retake"
                      value={option}
                      checked={retake === option}
                      onChange={() => setRetake(option)}
                      required
                      className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border bg-parchment text-sage focus:ring-sage/30"
              />
              <span className="text-sm text-ink-muted">
                I agree to be contacted about course details, schedules, and
                updates.
              </span>
            </label>

            {formState === "error" && (
              <motion.p
                className="rounded-[4px] bg-error-bg px-3 py-2 text-sm text-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springTransition}
              >
                {errorMessage}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={!isFormValid || formState === "submitting"}
              className="relative w-full overflow-hidden rounded-[2px] border-2 border-ink bg-ink px-6 py-3 font-heading font-bold text-parchment disabled:cursor-not-allowed disabled:opacity-50"
              style={{ boxShadow: "4px 4px 0 #fe5400" }}
              whileHover={isFormValid ? { scale: 1.02 } : undefined}
              whileTap={isFormValid ? { scale: 0.98 } : undefined}
              transition={springTransition}
            >
              {formState === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Registration"
              )}
            </motion.button>
          </form>
        </>
      )}
    </ModalShell>
  );
}

export default CourseRegisterModal;
