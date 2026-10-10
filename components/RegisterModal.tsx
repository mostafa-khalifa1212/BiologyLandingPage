"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

export type NotesSubject = "a2" | "as" | "both";

type RegisterContextValue = {
  openRegister: (defaultSubject?: NotesSubject | React.MouseEvent) => void;
  closeRegister: () => void;
  isOpen: boolean;
};

const RegisterContext = createContext<RegisterContextValue | null>(null);

export function useRegisterModal(): RegisterContextValue {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegisterModal must be used within RegisterProvider");
  }
  return context;
}

type RegisterProviderProps = {
  children: ReactNode;
};

export function RegisterProvider({ children }: RegisterProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSubject, setInitialSubject] = useState<NotesSubject>("a2");

  const openRegister = useCallback(
    (defaultSubject?: NotesSubject | React.MouseEvent) => {
      if (
        defaultSubject === "as" ||
        defaultSubject === "a2" ||
        defaultSubject === "both"
      ) {
        setInitialSubject(defaultSubject);
      } else {
        setInitialSubject("a2");
      }
      setIsOpen(true);
    },
    []
  );
  const closeRegister = useCallback(() => setIsOpen(false), []);

  return (
    <RegisterContext.Provider value={{ openRegister, closeRegister, isOpen }}>
      {children}
      <RegisterModal
        isOpen={isOpen}
        onClose={closeRegister}
        initialSubject={initialSubject}
      />
    </RegisterContext.Provider>
  );
}

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: NotesSubject;
};

type FormState = "idle" | "submitting" | "success" | "error";

const A2_NOTES_PDF = "/assets/Ch1 Respiration&Energy FREENOTES.pdf";
const AS_NOTES_PDF = "/assets/Ch1 Cell Structure FREENOTES.pdf";

function RegisterModal({
  isOpen,
  onClose,
  initialSubject = "a2",
}: RegisterModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<NotesSubject>(initialSubject);

  useEffect(() => {
    if (isOpen) {
      setSelectedNotes(initialSubject);
    }
  }, [isOpen, initialSubject]);

  const resetForm = () => {
    setFormState("idle");
    setErrorMessage("");
    setConsent(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!name || !email || !phone || !consent) return;

    setFormState("submitting");
    setErrorMessage("");

    try {
      const notesLabel =
        selectedNotes === "both"
          ? "Both AS & A2 Notes"
          : selectedNotes === "as"
          ? "AS Biology (Ch01 Cell Structure)"
          : "A2 Biology (Ch12 Respiration & Energy)";

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          notesChoice: notesLabel,
        }),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? `Server error: ${response.status}`);
      }

      setFormState("success");

      const triggerDownload = (fileUrl: string, fileName: string) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      if (selectedNotes === "a2" || selectedNotes === "both") {
        triggerDownload(A2_NOTES_PDF, "Ch1 Respiration&Energy FREENOTES.pdf");
      }

      if (selectedNotes === "as" || selectedNotes === "both") {
        setTimeout(
          () => {
            triggerDownload(AS_NOTES_PDF, "Ch1 Cell Structure FREENOTES.pdf");
          },
          selectedNotes === "both" ? 400 : 0
        );
      }
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    }
  };

  const isFormValid = consent;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      titleId="register-modal-title"
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
          <h2 id="register-modal-title" className="font-heading text-2xl font-bold text-ink">
            You&apos;re In!
          </h2>
          <p className="mt-2 text-sm text-ink-medium">
            Thank you for registering! Your notes download should start automatically.
          </p>

          <div className="mt-5 space-y-2.5 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Manual Download Links:
            </span>
            {(selectedNotes === "as" || selectedNotes === "both") && (
              <a
                href={AS_NOTES_PDF}
                download="Ch1 Cell Structure FREENOTES.pdf"
                className="btn-stamp-outline flex items-center justify-between px-4 py-2.5 text-xs font-semibold"
              >
                <span>📄 AS Chapter 1 Notes (Cell Structure)</span>
                <span className="font-bold text-sage">Download ↓</span>
              </a>
            )}
            {(selectedNotes === "a2" || selectedNotes === "both") && (
              <a
                href={A2_NOTES_PDF}
                download="Ch1 Respiration&Energy FREENOTES.pdf"
                className="btn-stamp-outline flex items-center justify-between px-4 py-2.5 text-xs font-semibold"
              >
                <span>📄 A2 Chapter 1 Notes (Respiration &amp; Energy)</span>
                <span className="font-bold text-sage">Download ↓</span>
              </a>
            )}
          </div>

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
            id="register-modal-title"
            className="font-heading pr-8 text-center text-2xl font-bold text-ink sm:text-3xl"
          >
            Get Your Free Chapter Notes
          </h2>
          <p className="mb-6 mt-2 text-center text-sm text-ink-muted sm:text-base">
            Enter your details to receive Chapter 1 notes instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="space-y-1.5">
              <legend className={labelClassName}>Which free notes would you like? *</legend>
              <div className="space-y-2">
                <label className={optionClassName}>
                  <input
                    type="radio"
                    name="notesChoice"
                    value="a2"
                    checked={selectedNotes === "a2"}
                    onChange={() => setSelectedNotes("a2")}
                    className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-ink">
                        A2 Biology Free Notes
                      </span>
                      <span className="rounded bg-ink/10 px-2 py-0.5 text-[10px] font-bold text-ink">
                        A2
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Chapter 12 · Respiration &amp; Energy
                    </p>
                  </div>
                </label>

                <label className={optionClassName}>
                  <input
                    type="radio"
                    name="notesChoice"
                    value="as"
                    checked={selectedNotes === "as"}
                    onChange={() => setSelectedNotes("as")}
                    className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-ink">
                        AS Biology Free Notes
                      </span>
                      <span className="rounded bg-sage/15 px-2 py-0.5 text-[10px] font-bold text-sage">
                        AS
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Chapter 1 · Cell Structure
                    </p>
                  </div>
                </label>

                <label className={optionClassName}>
                  <input
                    type="radio"
                    name="notesChoice"
                    value="both"
                    checked={selectedNotes === "both"}
                    onChange={() => setSelectedNotes("both")}
                    className="h-4 w-4 border-border bg-parchment text-sage focus:ring-sage/30"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-ink">
                        Both AS &amp; A2 Free Notes
                      </span>
                      <span className="rounded bg-sage/20 px-2 py-0.5 text-[10px] font-bold text-sage">
                        AS + A2
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Cell Structure + Respiration &amp; Energy
                    </p>
                  </div>
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="register-name" className={labelClassName}>
                Full Name *
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your Full Name"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="register-email" className={labelClassName}>
                Email Address *
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="register-phone" className={labelClassName}>
                Phone Number *
              </label>
              <input
                id="register-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+20 XXX XXX XXXX"
                className={inputClassName}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border bg-parchment text-sage focus:ring-sage/30"
              />
              <span className="text-sm text-ink-muted">
                I agree to be contacted about free notes and course updates.
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
              className="btn-stamp w-full px-6 py-3 text-center font-heading font-bold"
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
                "Get My Free Notes"
              )}
            </motion.button>
          </form>
        </>
      )}
    </ModalShell>
  );
}

export default RegisterModal;
