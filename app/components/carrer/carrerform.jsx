"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useCallback, useRef, useState } from "react";

const quattroTitle = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
});

const latoBody = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const quattroButton = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
});

const INTRO =
  "At Sanskar Realty, we are building world-class properties and are looking for passionate professionals in property development and real estate sales. Join us in our quest to build the best in real estate development!";

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_CV_BYTES = 5 * 1024 * 1024;
/** Keep under typical Apps Script body limits (same as Work With Us modal). */
const RESUME_MAX_FOR_SHEET_UPLOAD = 1.5 * 1024 * 1024;

const ENQUIRE_API_PATH = "/api/enquire";

function readResumeAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const comma = dataUrl.indexOf(",");
      resolve(comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl);
    };
    reader.onerror = () => reject(new Error("Could not read CV file."));
    reader.readAsDataURL(file);
  });
}

function digitsOnly(phone) {
  return phone.replace(/\D/g, "");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}

/** @typedef {"name" | "email" | "phone" | "designation" | "message"} TextField */
/** @typedef {Partial<Record<TextField | "cv", string>>} FormErrors */

const FIELD_ORDER = /** @type {const} */ ([
  "name",
  "email",
  "phone",
  "designation",
  "message",
]);

/** @param {TextField} field */
/** @param {Record<TextField, string>} textValues */
function validateTextField(field, textValues) {
  switch (field) {
    case "name": {
      const name = textValues.name.trim();
      if (!name) return "Please enter your name.";
      if (name.length < 2) return "Name must be at least 2 characters.";
      return;
    }
    case "email": {
      const email = textValues.email.trim();
      if (!email) return "Please enter your email.";
      if (!isValidEmail(email)) return "Please enter a valid email address.";
      return;
    }
    case "phone": {
      const phoneDigits = digitsOnly(textValues.phone);
      if (!phoneDigits) return "Please enter your phone number.";
      if (phoneDigits.length < 10 || phoneDigits.length > 15)
        return "Enter a valid number (10–15 digits).";
      return;
    }
    case "designation": {
      const designation = textValues.designation.trim();
      if (!designation) return "Please enter a designation.";
      if (designation.length < 2)
        return "Designation must be at least 2 characters.";
      return;
    }
    case "message": {
      const message = textValues.message.trim();
      if (!message) return "Please enter a message.";
      if (message.length < 10) return "Message must be at least 10 characters.";
      if (message.length > 2000)
        return "Message must be 2000 characters or less.";
      return;
    }
  }
}

function validateCvField(cv) {
  if (!cv || cv.size === 0) return "Please attach your CV.";
  if (!ALLOWED_CV_TYPES.includes(cv.type))
    return "CV must be a PDF or Word document (.pdf, .doc, .docx).";
  if (cv.size > MAX_CV_BYTES) return "File must be 5 MB or smaller.";
}

/** @param {Record<TextField, string>} textValues */
/** @param {File | null} cv */
function validateCareerForm(textValues, cv) {
  /** @type {FormErrors} */
  const errors = {};
  for (const f of FIELD_ORDER) {
    const err = validateTextField(f, textValues);
    if (err) errors[f] = err;
  }
  const cvErr = validateCvField(cv);
  if (cvErr) errors.cv = cvErr;
  return errors;
}

export default function Carrerform() {
  const fileInputRef = useRef(null);

  /** @type {[Record<TextField, string>, function]} */
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    message: "",
  });
  /** @type {[FormErrors, function]} */
  const [errors, setErrors] = useState({});
  const [cv, setCv] = useState(null);
  const [cvLabel, setCvLabel] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = useCallback((key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const onTextChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) clearFieldError(field);
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError("");
  };

  const onTextBlur = (field) => {
    const err = validateTextField(field, values);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const onCvChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setCv(file);
    setCvLabel(file ? file.name : "");
    clearFieldError("cv");
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError("");
    const nextErrors = validateCareerForm(values, cv);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const order = [...FIELD_ORDER, "cv"];
      const first = order.find((k) => nextErrors[k]);
      if (first === "cv" && fileInputRef.current) fileInputRef.current.focus();
      else if (first && typeof document !== "undefined") {
        document.getElementById(`career-${first}`)?.focus();
      }
      return;
    }

    if (!cv) return;

    if (cv.size > RESUME_MAX_FOR_SHEET_UPLOAD) {
      setErrors({
        cv: "For online submission, CV must be 1.5 MB or smaller (compress PDF if needed).",
      });
      return;
    }

    setIsSubmitting(true);
    let resumeBase64;
    try {
      resumeBase64 = await readResumeAsBase64(cv);
    } catch {
      setIsSubmitting(false);
      setSubmitError("Could not read CV file — try another file.");
      return;
    }

    const fullName = values.name.trim();
    const email = values.email.trim();
    const mobile = digitsOnly(values.phone);
    const designation = values.designation.trim();
    const message = values.message.trim();
    const details = [
      `Designation: ${designation}`,
      `CV: ${cv.name} (${cv.type || "file"})`,
    ].join("\n");

    const payload = {
      formType: "Career application",
      fullName,
      email,
      mobile,
      designation,
      /** Sheet scripts often reuse Work With Us keys for the “team / role” column. */
 
      teamLabel: designation,
      message,
      details,
      note: message,
      notes: message,
      consent: true,
      resumeFileName: cv.name,
      resumeMimeType: cv.type || "application/octet-stream",
      resumeBase64,
    };

    try {
      const res = await fetch(ENQUIRE_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let parsed;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = null;
      }
      if (!res.ok) {
        throw new Error(
          typeof parsed === "object" &&
            parsed !== null &&
            "message" in parsed &&
            typeof parsed.message === "string"
            ? parsed.message
            : `Server returned ${res.status}`,
        );
      }
      if (parsed && typeof parsed === "object" && "ok" in parsed && parsed.ok === false) {
        const m =
          "message" in parsed && typeof parsed.message === "string"
            ? parsed.message
            : "Submission rejected.";
        throw new Error(m);
      }
      const trimmed = text.trim();
      if (
        trimmed.startsWith("<!DOCTYPE") ||
        trimmed.startsWith("<html") ||
        /Script function not found/i.test(text)
      ) {
        throw new Error("Apps Script: add doGet + doPost and redeploy Web app.");
      }

      setSubmitSuccess(true);
      setValues({
        name: "",
        email: "",
        phone: "",
        designation: "",
        message: "",
      });
      setCv(null);
      setCvLabel("");
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const raw = err instanceof Error ? err.message.trim() : String(err);
      const detail = raw.length > 280 ? `${raw.slice(0, 280)}…` : raw;
      setSubmitError(
        detail ? `Could not submit. ${detail}` : "Could not submit. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Hint in-field only; hides when user types. Accessible name via sr-only label. */
  const inputClassBase = `${latoBody.className} w-full border-x-0 border-t-0 border-b border-solid bg-transparent pt-0.5 pb-[10px] lg:pb-[13px] text-[14px] font-normal leading-[100%] text-[#111111] outline-none transition-colors placeholder:text-[#666666]`;
  const inputBorderOk = "border-[#CCCCCC] focus:border-[#111111]";
  const inputBorderErr = "border-red-500 focus:border-red-500";
  const textareaClassBase = `${latoBody.className} min-h-[72px] w-full resize-y border-x-0 border-t-0 border-b border-solid bg-transparent pt-0.5 pb-[10px] text-[14px] font-normal leading-[150%] text-[#111111] outline-none transition-colors placeholder:text-[#666666]`;

  return (
    <section
      id="career-application-form"
      className="relative w-full scroll-mt-[88px] bg-white py-12 sm:py-14 md:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <header className="mx-auto mb-10 text-center sm:mb-12 lg:mb-14">
            <h2
              className={`${quattroTitle.className} text-[28px] font-normal uppercase leading-[100%] tracking-normal text-[#111111] sm:text-[32px] lg:text-[36px]`}
            >
            Start Your Career with Us
            </h2>
            <p
              className={`${latoBody.className} mx-auto mt-4 max-w-[1000px] text-[15px] font-normal leading-[28px] tracking-normal text-[#00000099] sm:text-[16px] lg:mt-5`}
            >
              {INTRO}
            </p>
          </header>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex w-full justify-center">
              <div className="relative mx-auto w-full max-w-[420px] md:max-w-[480px] lg:max-w-[550px]">
                <Image
                  src="/assets/applystar.png"
                  alt="Professional working on a laptop — join our team"
                  width={520}
                  height={520}
                  className="mx-auto h-auto w-full object-contain"
                  sizes="(max-width: 767px) min(420px, 100vw), (max-width: 1023px) 40vw, 480px"
                />
              </div>
            </div>

            <div className="w-full min-w-0">
              <form className="flex w-full flex-col gap-6 sm:gap-7" noValidate onSubmit={onSubmit}>
                {submitSuccess ? (
                  <p
                    className={`${latoBody.className} text-[14px] font-normal leading-normal text-[#2E7D32]`}
                    role="status"
                  >
                    Thank you — we have received your application.
                  </p>
                ) : null}
                {submitError ? (
                  <p
                    className={`${latoBody.className} text-[14px] font-normal leading-normal text-red-600`}
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}

                <div className="flex w-full flex-col text-left">
                  <label htmlFor="career-name" className="sr-only">
                    Enter Your Name
                  </label>
                  <input
                    id="career-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter Your Name"
                    value={values.name}
                    onChange={(e) => onTextChange("name", e.target.value)}
                    onBlur={() => onTextBlur("name")}
                    maxLength={120}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "career-name-err" : undefined}
                    className={`${inputClassBase} ${errors.name ? inputBorderErr : inputBorderOk}`}
                  />
                  {errors.name ? (
                    <p
                      id="career-name-err"
                      className={`${latoBody.className} mt-1.5 text-[13px] leading-normal text-red-600`}
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="flex w-full flex-col text-left">
                  <label htmlFor="career-email" className="sr-only">
                    Enter Your Email
                  </label>
                  <input
                    id="career-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChange={(e) => onTextChange("email", e.target.value)}
                    onBlur={() => onTextBlur("email")}
                    maxLength={254}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "career-email-err" : undefined}
                    className={`${inputClassBase} ${errors.email ? inputBorderErr : inputBorderOk}`}
                  />
                  {errors.email ? (
                    <p
                      id="career-email-err"
                      className={`${latoBody.className} mt-1.5 text-[13px] leading-normal text-red-600`}
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="flex w-full flex-col text-left">
                  <label htmlFor="career-phone" className="sr-only">
                    Enter Your Phone
                  </label>
                  <input
                    id="career-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Enter Your Phone"
                    value={values.phone}
                    onChange={(e) => onTextChange("phone", e.target.value)}
                    onBlur={() => onTextBlur("phone")}
                    maxLength={22}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? "career-phone-err" : undefined}
                    className={`${inputClassBase} ${errors.phone ? inputBorderErr : inputBorderOk}`}
                  />
                  {errors.phone ? (
                    <p
                      id="career-phone-err"
                      className={`${latoBody.className} mt-1.5 text-[13px] leading-normal text-red-600`}
                    >
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div className="flex w-full flex-col text-left">
                  <label htmlFor="career-designation" className="sr-only">
                    Designation
                  </label>
                  <input
                    id="career-designation"
                    name="designation"
                    type="text"
                    autoComplete="organization-title"
                    placeholder="Designation"
                    value={values.designation}
                    onChange={(e) => onTextChange("designation", e.target.value)}
                    onBlur={() => onTextBlur("designation")}
                    maxLength={120}
                    aria-invalid={errors.designation ? true : undefined}
                    aria-describedby={
                      errors.designation ? "career-designation-err" : undefined
                    }
                    className={`${inputClassBase} ${errors.designation ? inputBorderErr : inputBorderOk}`}
                  />
                  {errors.designation ? (
                    <p
                      id="career-designation-err"
                      className={`${latoBody.className} mt-1.5 text-[13px] leading-normal text-red-600`}
                    >
                      {errors.designation}
                    </p>
                  ) : null}
                </div>

                <div className="flex w-full flex-col text-left">
                  <label htmlFor="career-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="career-message"
                    name="message"
                    rows={4}
                    placeholder="Message"
                    value={values.message}
                    onChange={(e) => onTextChange("message", e.target.value)}
                    onBlur={() => onTextBlur("message")}
                    maxLength={2000}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "career-message-err" : undefined}
                    className={`${textareaClassBase} ${errors.message ? inputBorderErr : inputBorderOk}`}
                  />
                  {errors.message ? (
                    <p
                      id="career-message-err"
                      className={`${latoBody.className} mt-1.5 text-[13px] leading-normal text-red-600`}
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex w-full flex-col text-left">
                  <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
                    <span
                      id="career-cv-label"
                      className={`${quattroTitle.className} shrink-0 text-left text-[14px] font-normal leading-normal tracking-normal text-[#666666] sm:text-[15px]`}
                    >
                      Your CV
                    </span>
                    <input
                      ref={fileInputRef}
                      id="career-cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={onCvChange}
                      aria-labelledby="career-cv-label"
                      aria-invalid={errors.cv ? true : undefined}
                      aria-describedby={errors.cv ? "career-cv-err" : "career-cv-hint"}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="career-cv"
                      className={`${quattroTitle.className} inline-flex shrink-0 cursor-pointer border border-solid border-[#CCCCCC] bg-white px-3 py-1.5 text-left text-[13px] font-normal leading-normal tracking-normal text-[#111111] transition-colors hover:bg-[#FAFAFA] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#111111] sm:text-[14px]`}
                    >
                      Choose file
                    </label>
                    <span
                      id="career-cv-hint"
                      className={`${quattroTitle.className} min-w-0 flex-1 truncate text-left text-[13px] font-normal leading-normal tracking-normal text-[#666666] sm:text-[14px] sm:max-w-[min(100%,220px)]`}
                    >
                      {cvLabel || "No file chosen"}
                    </span>
                  </div>
                  {errors.cv ? (
                    <p
                      id="career-cv-err"
                      className={`${latoBody.className} mt-1.5 text-[13px] leading-normal text-red-600`}
                    >
                      {errors.cv}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${quattroButton.className} mx-auto w-full max-w-[230px] mt-2 md:mt-6 rounded-full border-0 bg-black px-8 py-3.5 text-center text-[15px] font-normal uppercase leading-none tracking-normal text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60 sm:py-4 sm:text-[16px] lg:mx-0`}
                >
                  {isSubmitting ? "Submitting…" : "Interested"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
