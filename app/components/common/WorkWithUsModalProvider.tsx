"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { Lato, Quattrocento } from "next/font/google";
import {
  isValidEmail,
  isValidIndianMobile,
  validateResumeFile,
  isValidFullName,
} from "./formValidation";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quattrocento",
});

const TEAM_OPTIONS = [
  { value: "", label: "Select team *" },
  { value: "sales", label: "Sales Team" },
  { value: "management", label: "Management Team" },
  { value: "marketing", label: "Marketing Team" },
  { value: "operations", label: "Operations Team" },
  { value: "hr", label: "Human Resources" },
  { value: "other", label: "Other" },
] as const;

type WorkWithUsModalContextValue = {
  openWorkWithUsModal: () => void;
};

const WorkWithUsModalContext =
  createContext<WorkWithUsModalContextValue | null>(null);

export function useWorkWithUsModal() {
  const ctx = useContext(WorkWithUsModalContext);
  if (!ctx) {
    throw new Error(
      "useWorkWithUsModal must be used within WorkWithUsModalProvider",
    );
  }
  return ctx;
}

export function WorkWithUsModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const titleId = useId();
  const close = useCallback(() => setOpen(false), []);
  const openWorkWithUsModal = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (open) setErrors({});
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const fieldBorder = (key: string) =>
    errors[key]
      ? "border-red-500 focus:border-red-600 focus:ring-red-500/30"
      : "border-[#E5E5E5] focus:border-[#111111] focus:ring-[#111111]";

  const inputBase =
    "min-h-[48px] w-full rounded-lg border bg-white px-3 py-2.5 font-lato text-[14px] font-normal text-[#111111] outline-none ring-1 ring-transparent placeholder:text-[#9CA3AF] focus:ring-2 sm:px-4 sm:text-[15px]";

  const labelClass =
    "mb-1 block font-lato text-[12px] font-medium uppercase tracking-wide text-[#555555] sm:text-[13px]";

  return (
    <WorkWithUsModalContext.Provider value={{ openWorkWithUsModal }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[221] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close work with us form"
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`${lato.variable} ${quattrocento.variable} relative z-10 w-full max-w-[480px] overflow-hidden rounded-2xl bg-[#F5F5F4] shadow-[0_24px_80px_rgba(0,0,0,0.35)]`}
          >
            <div className="relative max-h-[min(90vh,720px)] overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-[#111111]/70 transition-colors hover:bg-black/[0.06] hover:text-[#111111] sm:right-4 sm:top-4"
                aria-label="Close"
              >
                <i className="ri-close-line text-2xl leading-none" aria-hidden />
              </button>

              <h2
                id={titleId}
                className="font-quattrocento pr-10 text-[22px] font-normal uppercase leading-[1.15] tracking-normal text-[#111111] sm:text-[24px]"
              >
                Work With Us
              </h2>
              <p className="mt-2 font-lato text-[14px] font-normal leading-relaxed text-[#6B7280] sm:text-[15px]">
                Tell us which team you&apos;re interested in and share your
                details. We&apos;ll get in touch.
              </p>

              <form
                className="mt-6 flex flex-col gap-4"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const team = String(fd.get("team") ?? "").trim();
                  const name = String(fd.get("name") ?? "").trim();
                  const email = String(fd.get("email") ?? "").trim();
                  const mobile = String(fd.get("mobile") ?? "").trim();
                  const fileInput = (
                    e.currentTarget.elements.namedItem(
                      "resume",
                    ) as HTMLInputElement | null
                  )?.files?.[0];

                  const next: Record<string, string> = {};
                  if (!team) {
                    next.team = "Please select a team.";
                  }
                  if (!isValidFullName(name)) {
                    next.name =
                      "Enter your full name (letters only, 2–120 characters).";
                  }
                  if (!email) {
                    next.email = "Email is required.";
                  } else if (!isValidEmail(email)) {
                    next.email = "Enter a valid email address.";
                  }
                  if (!mobile) {
                    next.mobile = "Mobile number is required.";
                  } else if (!isValidIndianMobile(mobile)) {
                    next.mobile =
                      "Enter a valid 10-digit Indian mobile (e.g. 9876543210).";
                  }
                  const resumeErr = fileInput
                    ? validateResumeFile(fileInput)
                    : "Please attach your resume.";
                  if (resumeErr) {
                    next.resume = resumeErr;
                  }

                  if (Object.keys(next).length > 0) {
                    setErrors(next);
                    return;
                  }
                  setErrors({});
                  close();
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-4">
                  <div className="min-w-0 sm:col-span-2">
                    <label htmlFor="work-team" className={labelClass}>
                      Team
                    </label>
                    <select
                      id="work-team"
                      name="team"
                      defaultValue=""
                      aria-invalid={!!errors.team}
                      aria-describedby={
                        errors.team ? "work-team-err" : undefined
                      }
                      onChange={() =>
                        setErrors((p) => {
                          const { team: _, ...r } = p;
                          return r;
                        })
                      }
                      className={`${inputBase} ${fieldBorder("team")}`}
                    >
                      {TEAM_OPTIONS.map((opt) => (
                        <option
                          key={opt.value || "placeholder"}
                          value={opt.value}
                          disabled={opt.value === ""}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.team ? (
                      <p
                        id="work-team-err"
                        className="mt-1 font-lato text-[11px] text-red-600 sm:text-[12px]"
                      >
                        {errors.team}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="work-name" className={labelClass}>
                      Full name *
                    </label>
                    <input
                      id="work-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "work-name-err" : undefined}
                      onInput={() =>
                        setErrors((p) => {
                          const { name: _, ...r } = p;
                          return r;
                        })
                      }
                      className={`${inputBase} ${fieldBorder("name")}`}
                    />
                    {errors.name ? (
                      <p
                        id="work-name-err"
                        className="mt-1 font-lato text-[11px] text-red-600 sm:text-[12px]"
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="work-email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="work-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "work-email-err" : undefined
                      }
                      onInput={() =>
                        setErrors((p) => {
                          const { email: _, ...r } = p;
                          return r;
                        })
                      }
                      className={`${inputBase} ${fieldBorder("email")}`}
                    />
                    {errors.email ? (
                      <p
                        id="work-email-err"
                        className="mt-1 font-lato text-[11px] text-red-600 sm:text-[12px]"
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="work-mobile" className={labelClass}>
                      Mobile *
                    </label>
                    <input
                      id="work-mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Mobile number"
                      autoComplete="tel"
                      aria-invalid={!!errors.mobile}
                      aria-describedby={
                        errors.mobile ? "work-mobile-err" : undefined
                      }
                      onInput={() =>
                        setErrors((p) => {
                          const { mobile: _, ...r } = p;
                          return r;
                        })
                      }
                      className={`${inputBase} ${fieldBorder("mobile")}`}
                    />
                    {errors.mobile ? (
                      <p
                        id="work-mobile-err"
                        className="mt-1 font-lato text-[11px] text-red-600 sm:text-[12px]"
                      >
                        {errors.mobile}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="work-resume" className={labelClass}>
                      Resume *
                    </label>
                    <input
                      id="work-resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      aria-invalid={!!errors.resume}
                      aria-describedby={
                        errors.resume ? "work-resume-err" : undefined
                      }
                      onChange={() =>
                        setErrors((p) => {
                          const { resume: _, ...r } = p;
                          return r;
                        })
                      }
                      className={`min-h-[48px] w-full min-w-0 cursor-pointer rounded-lg border border-dashed bg-white px-2 py-2 font-lato text-[12px] text-[#111111] outline-none ring-1 ring-transparent file:mr-2 file:max-w-[min(100%,140px)] file:truncate file:rounded-md file:border-0 file:bg-[#111111] file:px-2 file:py-1.5 file:font-lato file:text-[12px] file:font-medium file:text-white hover:opacity-95 focus:ring-2 sm:px-3 sm:py-2.5 sm:text-[13px] sm:file:mr-3 sm:file:max-w-none sm:file:px-3 sm:file:text-[13px] ${
                        errors.resume
                          ? "border-red-500 focus:ring-red-500/30"
                          : "border-[#C4C4C4] hover:border-[#111111]"
                      }`}
                    />
                    <p className="mt-1 font-lato text-[11px] text-[#888888] sm:text-[12px]">
                      PDF or Word, max 5 MB recommended.
                    </p>
                    {errors.resume ? (
                      <p
                        id="work-resume-err"
                        className="mt-1 font-lato text-[11px] text-red-600 sm:text-[12px]"
                      >
                        {errors.resume}
                      </p>
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  className="min-h-[48px] w-full rounded-lg border border-[#111111] bg-[#111111] px-3 py-2.5 font-lato text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#222] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:text-[15px]"
                >
                  Submit application
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </WorkWithUsModalContext.Provider>
  );
}
