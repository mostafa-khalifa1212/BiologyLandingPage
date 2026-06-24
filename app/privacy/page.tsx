import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | A2 Biology - Mostafa Khalifa",
  description: "Privacy policy for the A2 Biology landing page and free notes registration.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-300 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block font-heading text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Home
        </Link>
        <h1 className="font-heading mb-8 text-3xl font-bold text-white">
          Privacy Policy
        </h1>
        <div className="space-y-6 leading-relaxed">
          <section>
            <h2 className="font-heading mb-3 text-xl font-semibold text-white">
              Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide when
              you register for our free notes through the registration form on
              this website. This includes your name, email address, and phone
              number. Additional information for full course registration is
              collected directly through Google Forms, which is handled
              externally from this website.
            </p>
          </section>
          <section>
            <h2 className="font-heading mb-3 text-xl font-semibold text-white">
              How We Use Your Information
            </h2>
            <p>
              We use your information to deliver free notes, communicate course
              updates, and improve our services. Your data is stored securely in
              Google Sheets and is not sold to third parties.
            </p>
          </section>
          <section>
            <h2 className="font-heading mb-3 text-xl font-semibold text-white">
              Contact
            </h2>
            <p>
              For privacy-related questions, contact{" "}
              <a
                href="mailto:mostafakhalifaa1212@gmail.com"
                className="text-emerald-400 hover:text-emerald-300"
              >
                mostafakhalifaa1212@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
        <p className="mt-12 text-sm text-slate-600">
          &copy; {new Date().getFullYear()} A2 Biology | Mostafa Khalifa. All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
}
