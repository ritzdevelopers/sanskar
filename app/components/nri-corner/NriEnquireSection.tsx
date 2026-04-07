"use client";

import Image from "next/image";
import { type FormEvent, useCallback, useState } from "react";
import { Lato, Quattrocento } from "next/font/google";

const ENQUIRE_API_PATH = "/api/enquire";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const inputClass = `mt-1 w-full border-0 border-b border-white/40 bg-black pt-2 pb-3 font-normal outline-none transition-colors focus:border-white focus:bg-black active:bg-black ${lato.className} text-[14px] leading-[100%] text-white caret-white placeholder:font-normal placeholder:text-[14px] placeholder:leading-[100%] placeholder:text-[#FFFFFF66] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#000000] [&:-webkit-autofill]:[transition:background-color_99999s_ease-out_0s]`;

const textareaClass = `mt-1 w-full border-0 border-b border-white/40 bg-black pt-2 pb-3 font-normal outline-none transition-colors focus:border-white focus:bg-black active:bg-black ${lato.className} min-h-[72px] resize-y text-[14px] leading-[150%] text-white caret-white placeholder:text-[14px] placeholder:leading-[150%] placeholder:text-[#FFFFFF66] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#000000] [&:-webkit-autofill]:[transition:background-color_99999s_ease-out_0s]`;

const errorBorder = "border-b-red-400 focus:border-red-300";

type FieldName = "name" | "email" | "phone" | "message";

type FormErrors = Partial<Record<FieldName, string>>;

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "");
}

/** Basic email check; avoids the worst false negatives for real users. */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "message"];

function fieldError(
  field: FieldName,
  values: Record<FieldName, string>,
): string | undefined {
  switch (field) {
    case "name": {
      const name = values.name.trim();
      if (!name) return "Please enter your name.";
      if (name.length < 2) return "Name must be at least 2 characters.";
      return;
    }
    case "email": {
      const email = values.email.trim();
      if (!email) return "Please enter your email.";
      if (!isValidEmail(email)) return "Please enter a valid email address.";
      return;
    }
    case "phone": {
      const phoneDigits = digitsOnly(values.phone);
      if (!phoneDigits) return "Please enter your phone number.";
      if (phoneDigits.length < 10 || phoneDigits.length > 15)
        return "Enter a valid number (10–15 digits).";
      return;
    }
    case "message": {
      const message = values.message.trim();
      if (!message) return "Please enter a message.";
      if (message.length < 10) return "Message must be at least 10 characters.";
      if (message.length > 2000)
        return "Message must be 2000 characters or less.";
      return;
    }
  }
}

function validateForm(values: Record<FieldName, string>): FormErrors {
  const errors: FormErrors = {};
  for (const f of FIELD_ORDER) {
    const err = fieldError(f, values);
    if (err) errors[f] = err;
  }
  return errors;
}

export function NriEnquireSection() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    phone: "",
    message: "",
    
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = useCallback((field: FieldName) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const onFieldChange = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) clearFieldError(field);
    if (submitSuccess) setSubmitSuccess(false);
  };

  const onFieldBlur = (field: FieldName) => {
    const err = fieldError(field, values);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitSuccess(false);
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = FIELD_ORDER.find((f) => nextErrors[f]);
      if (first && typeof document !== "undefined") {
        document.getElementById(`nri-enquire-${first}`)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        formType: "NRI Enquire",
        fullName: values.name.trim(),
        email: values.email.trim(),
        mobile: digitsOnly(values.phone),
        message: values.message.trim(),
        details: values.message.trim(),
        notes: values.message.trim(),
      };

      const res = await fetch(ENQUIRE_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let parsed: unknown;
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
            typeof (parsed as { message: string }).message === "string"
            ? (parsed as { message: string }).message
            : `Server returned ${res.status}`,
        );
      }
      if (
        parsed &&
        typeof parsed === "object" &&
        "ok" in parsed &&
        (parsed as { ok: unknown }).ok === false
      ) {
        const m =
          "message" in parsed &&
          typeof (parsed as { message?: string }).message === "string"
            ? (parsed as { message: string }).message
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
      setValues({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch {
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="nri-enquire"
      className="w-full scroll-mt-[50px] bg-white py-[35px] lg:py-[75px]"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:justify-start lg:gap-10 lg:text-left xl:max-w-[1320px] xl:gap-[60px]">
          <div className="flex w-full min-w-0 max-w-[720px] flex-col items-center lg:min-w-0 lg:max-w-none lg:flex-1 lg:items-start lg:text-left">
            <p
              className={`${lato.className} text-center text-[16px] font-normal leading-[28px] tracking-normal text-[#111111] sm:text-[17px] md:leading-[30px] lg:text-left`}
            >
              At Sanskar Realty, we make it easy for NRIs to invest in property.
              We guide you through all the legal procedures, payment options, and
              documentation. Contact us now to start your property investment in
              India!
            </p>
            <div className="relative mt-8 h-[min(444px,70vw)] w-full max-w-[720px] overflow-hidden sm:mt-10 lg:mt-10 lg:h-[min(444px,50vh)] lg:min-h-[320px] lg:w-full lg:max-w-none xl:h-[444px]">
              <Image
                src="/assets/home_decor.png"
                alt="Modern interior living space"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="box-border flex w-full max-w-[499px] shrink-0 flex-col gap-[36px] bg-black p-5 text-left sm:p-6 lg:min-h-[min(577px,100%)] lg:w-[min(100%,499px)] lg:max-w-[499px] lg:p-[20px] xl:py-[50px] xl:px-[40px] xl:min-h-[577px] xl:w-[499px]">
            <h2
              className={`${quattrocento.className} m-0 text-left text-[28px] font-normal leading-[1.1] tracking-normal text-white sm:text-[32px] lg:text-[36px] lg:leading-[28px]`}
            >
              Enquire Now
            </h2>
            <form
              className="flex w-full flex-col gap-[36px] lg:max-w-none [color-scheme:dark]"
              noValidate
              onSubmit={onSubmit}
            >
              {submitSuccess ? (
                <p
                  className={`${lato.className} m-0 text-[14px] font-normal leading-normal text-[#7ed957]`}
                  role="status"
                >
                  Thank you — your enquiry has been noted. We’ll get back to you
                  soon.
                </p>
              ) : null}
              <div className="flex w-full flex-col text-left">
                <label htmlFor="nri-enquire-name" className="sr-only">
                  Enter Your Name
                </label>
                <input
                  id="nri-enquire-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter Your Name"
                  value={values.name}
                  onChange={(e) => onFieldChange("name", e.target.value)}
                  onBlur={() => onFieldBlur("name")}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "nri-enquire-name-err" : undefined}
                  maxLength={120}
                  className={`${inputClass} ${errors.name ? errorBorder : ""}`}
                />
                {errors.name ? (
                  <p
                    id="nri-enquire-name-err"
                    className={`${lato.className} mt-1.5 text-[13px] leading-normal text-red-400`}
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="flex w-full flex-col text-left">
                <label htmlFor="nri-enquire-email" className="sr-only">
                  Enter Your Email
                </label>
                <input
                  id="nri-enquire-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  onBlur={() => onFieldBlur("email")}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "nri-enquire-email-err" : undefined}
                  maxLength={254}
                  className={`${inputClass} ${errors.email ? errorBorder : ""}`}
                />
                {errors.email ? (
                  <p
                    id="nri-enquire-email-err"
                    className={`${lato.className} mt-1.5 text-[13px] leading-normal text-red-400`}
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className="flex w-full flex-col text-left">
                <label htmlFor="nri-enquire-phone" className="sr-only">
                  Enter Your Phone Number
                </label>
                <input
                  id="nri-enquire-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Enter Your Phone Number"
                  value={values.phone}
                  onChange={(e) => onFieldChange("phone", e.target.value)}
                  onBlur={() => onFieldBlur("phone")}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? "nri-enquire-phone-err" : undefined}
                  maxLength={22}
                  className={`${inputClass} ${errors.phone ? errorBorder : ""}`}
                />
                {errors.phone ? (
                  <p
                    id="nri-enquire-phone-err"
                    className={`${lato.className} mt-1.5 text-[13px] leading-normal text-red-400`}
                  >
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div className="flex w-full flex-col text-left">
                <label htmlFor="nri-enquire-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="nri-enquire-message"
                  name="message"
                  rows={3}
                  placeholder="Message"
                  value={values.message}
                  onChange={(e) => onFieldChange("message", e.target.value)}
                  onBlur={() => onFieldBlur("message")}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "nri-enquire-message-err" : undefined}
                  maxLength={2000}
                  className={`${textareaClass} ${errors.message ? errorBorder : ""}`}
                />
                {errors.message ? (
                  <p
                    id="nri-enquire-message-err"
                    className={`${lato.className} mt-1.5 text-[13px] leading-normal text-red-400`}
                  >
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${lato.className} w-full shrink-0 rounded-full border-0 bg-[#F5AC00] px-6 py-3.5 text-center text-[16px] font-semibold leading-normal text-white transition-opacity hover:opacity-95 sm:py-4`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
