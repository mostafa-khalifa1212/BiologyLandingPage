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
} from "@/components/ModalShell";
import { springTransition } from "@/lib/motion";

type RegisterContextValue = {
  openRegister: () => void;
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

  const openRegister = useCallback(() => setIsOpen(true), []);
  const closeRegister = useCallback(() => setIsOpen(false), []);

  return (
    <RegisterContext.Provider value={{ openRegister, closeRegister, isOpen }}>
      {children}
      <RegisterModal isOpen={isOpen} onClose={closeRegister} />
    </RegisterContext.Provider>
  );
}

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = "idle" | "submitting" | "success" | "error";

const FREE_NOTES_PDF = "/assets/Ch1 Respiration&Energy FREENOTES.pdf";

function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(false);

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? `Server error: ${response.status}`);
      }

      setFormState("success");

      const link = document.createElement("a");
      link.href = FREE_NOTES_PDF;
      link.download = "Ch1 Respiration&Energy FREENOTES.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          <p className="mt-3 text-ink-medium">
            Thank you for registering! Your notes download should start automatically.
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
            id="register-modal-title"
            className="font-heading pr-8 text-center text-2xl font-bold text-ink sm:text-3xl"
          >
            Get Your Free Chapter Notes
          </h2>
          <p className="mb-6 mt-2 text-center text-sm text-ink-muted sm:text-base">
            Enter your details to receive &quot;Respiration &amp; Energy&quot; notes instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-name" className={labelClassName}>
                Full Name
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
                Email Address
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
                Phone Number
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
