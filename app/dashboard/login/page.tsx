"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useState } from "react";

import { API_BASE, parseJson } from "../lib";

const STAFF_ROLE_KEY = "dashboardStaffRole";

type LoginUser = {
  role?: string;
  email?: string;
  name?: string;
  permissions?: boolean;
};

export default function DashboardLoginPage() {
  const router = useRouter();
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const [logMsg, setLogMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const [tokenHint, setTokenHint] = useState<string | null>(null);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [fpStep, setFpStep] = useState<1 | 2 | 3>(1);
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpPassword, setFpPassword] = useState("");
  const [fpConfirm, setFpConfirm] = useState("");
  const [fpLoading, setFpLoading] = useState(false);
  const [fpMsg, setFpMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const setHintFromToken = useCallback((t: unknown) => {
    if (typeof t === "string" && t.length > 20) {
      setTokenHint(`${t.slice(0, 12)}…${t.slice(-6)}`);
    } else {
      setTokenHint(null);
    }
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLogMsg(null);
    setLogLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/login-staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: logEmail.trim(),
          password: logPassword,
        }),
      });
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Login failed"));
      }
      setHintFromToken(data.token);
      const u = data.user as LoginUser | undefined;
      if (typeof window !== "undefined") {
        if (u?.role === "superadmin") {
          sessionStorage.setItem(STAFF_ROLE_KEY, "superadmin");
        } else {
          sessionStorage.removeItem(STAFF_ROLE_KEY);
        }
      }
      if (u?.role === "superadmin") {
        setLogPassword("");
        router.replace("/dashboard/superadmin");
        return;
      }
      if (u?.role === "admin" || u?.role === "editor") {
        setLogPassword("");
        router.replace("/dashboard/staff");
        return;
      }
      setLogMsg({
        type: "ok",
        text: "Login OK — token dubara cookie + database mein update.",
      });
      setLogPassword("");
    } catch (err) {
      setLogMsg({
        type: "err",
        text: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setLogLoading(false);
    }
  }

  function openForgotPassword() {
    setFpMsg(null);
    setFpStep(1);
    setFpOtp("");
    setFpPassword("");
    setFpConfirm("");
    setFpEmail(logEmail.trim());
    setForgotOpen(true);
  }

  function closeForgotPassword() {
    setForgotOpen(false);
    setFpMsg(null);
    setFpStep(1);
    setFpLoading(false);
  }

  async function onSendOtp() {
    setFpMsg(null);
    const email = fpEmail.trim();
    if (!email) {
      setFpMsg({ type: "err", text: "Enter your email address." });
      return;
    }
    setFpLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Could not send OTP"));
      }
      setFpMsg({ type: "ok", text: "OTP sent to your email. Check inbox (valid for 2 minutes)." });
      setFpStep(2);
    } catch (e) {
      setFpMsg({
        type: "err",
        text: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setFpLoading(false);
    }
  }

  async function onVerifyOtp() {
    setFpMsg(null);
    const email = fpEmail.trim();
    const otp = fpOtp.trim();
    if (!otp) {
      setFpMsg({ type: "err", text: "Enter the OTP from your email." });
      return;
    }
    setFpLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Verification failed"));
      }
      setFpMsg({ type: "ok", text: "OTP verified. Set a new password below." });
      setFpStep(3);
    } catch (e) {
      setFpMsg({
        type: "err",
        text: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setFpLoading(false);
    }
  }

  async function onResetPassword() {
    setFpMsg(null);
    const email = fpEmail.trim();
    const otp = fpOtp.trim();
    const password = fpPassword;
    if (password.length < 6) {
      setFpMsg({ type: "err", text: "Password must be at least 6 characters." });
      return;
    }
    if (password !== fpConfirm) {
      setFpMsg({ type: "err", text: "Passwords do not match." });
      return;
    }
    setFpLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Reset failed"));
      }
      setFpMsg({ type: "ok", text: "Password updated. You can sign in now." });
      setLogPassword("");
      setTimeout(() => {
        closeForgotPassword();
      }, 1500);
    } catch (e) {
      setFpMsg({
        type: "err",
        text: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setFpLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-full border border-[#e8e8e8] bg-white px-5 py-3 text-sm text-[#2e2e2e] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#F7A51D] focus:bg-white focus:ring-2 focus:ring-[#F7A51D]/20";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#efefef] px-4 py-8 sm:px-6">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[#a9d0d9]" /> */}
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-[36%] h-28 bg-[radial-gradient(120%_110%_at_50%_0%,#efefef_58%,transparent_59%)]" /> */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="mr-0 hidden w-full max-w-[420px] items-center justify-center lg:mr-10 lg:flex">
          <div
            className="h-[450px] w-[450px]"
            dangerouslySetInnerHTML={{
              __html:
                '<dotlottie-wc src="https://lottie.host/7017cb36-bc82-45f0-93ef-2399d25a6570/5eH4NxbFkP.lottie" style="width: 450px; height: 450px" autoplay loop></dotlottie-wc>',
            }}
          />
        </div>

        <section className="w-full max-w-[560px] rounded-sm  bg-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.35)]">
          <div className="px-6 pb-6 pt-8 sm:px-8">
            <h1 className="mb-7 text-center text-3xl font-semibold tracking-wide text-black">
              Login Form
            </h1>

            {logMsg ? (
              <div
                className={`mb-4 rounded-xl px-3 py-2 text-sm ${
                  logMsg.type === "ok"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {logMsg.text}
              </div>
            ) : null}

            <form onSubmit={onLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#4f4f4f]">
                  Username *
                </label>
              <input
                type="email"
                required
                value={logEmail}
                onChange={(e) => setLogEmail(e.target.value)}
                placeholder="Enter your Username"
                className={inputClass}
              />
              </div>

              <div className="relative">
                <label className="mb-1 block text-sm font-semibold text-[#4f4f4f]">
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-[calc(50%+12px)] -translate-y-1/2 rounded-lg p-1.5 text-[#8e8e8e] hover:bg-[#ececec]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={
                      showPassword
                        ? "ri-eye-off-line text-base"
                        : "ri-eye-line text-base"
                    }
                    aria-hidden
                  />
                </button>
              </div>

             

              {/* <p className="pt-1 text-xs text-[#6f6f94]">
                By login, you agree to our{" "}
                <span className="font-semibold underline">Terms &amp; Conditions</span>
              </p> */}

<button
  type="submit"
  disabled={logLoading}
  className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-full bg-black py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 ease-in-out hover:bg-amber-300 hover:text-black  disabled:opacity-60"
>
  {logLoading ? "Logging in..." : "Login"}
</button>
            </form>

            {tokenHint ? (
              <p className="mt-4 rounded-2xl border border-[#deddf0] bg-white px-3 py-2 text-[11px] text-[#66668a]">
                Token preview:{" "}
                <code className="font-mono text-[#3d346b]">{tokenHint}</code>
              </p>
            ) : null}

          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#dfdfdf] bg-white px-6 py-4 text-sm sm:px-8">
            <p className="text-left font-semibold text-black hover:text-black-300">
               <i> Don&apos;t have an account?{" "}</i>
                <Link
                  href="/dashboard/register"
                  className="font-bold text-black hover:text-[#878181]"
                >
                  Sign up
                </Link>
              </p>
              <button
                type="button"
                onClick={openForgotPassword}
                className="shrink-0 cursor-pointer font-bold  text-black hover:text-[#878181]"
              >
                Forgot password?
              </button>
          </div>
          {/* <div className="h-[6px] bg-[#F7A51D]" /> */}
            {/* <div className="text-right">
                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="text-sm font-semibold text-[#5a49d4] underline underline-offset-2 hover:text-[#4335b8]"
                >
                  Forgot password?
                </button>
              </div> */}

            {/* <p className="mt-4 text-center font-mono text-[10px] text-[#9b9bc0]">
              {API_BASE}
            </p> */}
        </section>
      </div>

      {forgotOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1a1240]/55 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget && !fpLoading) closeForgotPassword();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-password-title"
            className="w-full max-w-md rounded-2xl border border-white/80 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(47,31,133,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                id="forgot-password-title"
                className="text-lg font-bold text-[#241a52]"
              >
                Reset password
              </h2>
              <button
                type="button"
                disabled={fpLoading}
                onClick={closeForgotPassword}
                className="rounded-lg border border-zinc-200 px-2 py-1 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
              >
                Close
              </button>
            </div>
            <p className="mt-1 text-xs text-[#6d6d94]">
              Step {fpStep} of 3 — {fpStep === 1 ? "email" : fpStep === 2 ? "verify OTP" : "new password"}
            </p>

            {fpMsg ? (
              <div
                className={`mt-3 rounded-xl px-3 py-2 text-sm ${
                  fpMsg.type === "ok"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {fpMsg.text}
              </div>
            ) : null}

            <div className="mt-4 space-y-3">
              <div>
                <label
                  className="block text-xs font-semibold text-[#4c427e]"
                  htmlFor="fp-email"
                >
                  Email
                </label>
                <input
                  id="fp-email"
                  type="email"
                  autoComplete="email"
                  disabled={fpStep > 1 || fpLoading}
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                  className={`${inputClass} mt-1 ${fpStep > 1 ? "opacity-80" : ""}`}
                />
              </div>

              {fpStep >= 2 ? (
                <div>
                  <label
                    className="block text-xs font-semibold text-[#4c427e]"
                    htmlFor="fp-otp"
                  >
                    OTP
                  </label>
                  <input
                    id="fp-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={8}
                    disabled={fpStep > 2 || fpLoading}
                    value={fpOtp}
                    onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6-digit code"
                    className={`${inputClass} mt-1 tracking-widest ${fpStep > 2 ? "opacity-80" : ""}`}
                  />
                </div>
              ) : null}

              {fpStep === 3 ? (
                <>
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#4c427e]"
                      htmlFor="fp-new-pass"
                    >
                      New password
                    </label>
                    <input
                      id="fp-new-pass"
                      type="password"
                      autoComplete="new-password"
                      disabled={fpLoading}
                      value={fpPassword}
                      onChange={(e) => setFpPassword(e.target.value)}
                      className={`${inputClass} mt-1`}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#4c427e]"
                      htmlFor="fp-confirm-pass"
                    >
                      Confirm password
                    </label>
                    <input
                      id="fp-confirm-pass"
                      type="password"
                      autoComplete="new-password"
                      disabled={fpLoading}
                      value={fpConfirm}
                      onChange={(e) => setFpConfirm(e.target.value)}
                      className={`${inputClass} mt-1`}
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {fpStep === 1 ? (
                <button
                  type="button"
                  disabled={fpLoading}
                  onClick={() => void onSendOtp()}
                  className="rounded-2xl bg-gradient-to-r from-[#5f4be8] via-[#7460f1] to-[#8b77ff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(95,75,232,0.9)] hover:brightness-105 disabled:opacity-60"
                >
                  {fpLoading ? "Sending..." : "Send OTP"}
                </button>
              ) : null}
              {fpStep === 2 ? (
                <>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => {
                      setFpStep(1);
                      setFpOtp("");
                      setFpMsg(null);
                    }}
                    className="rounded-2xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => void onVerifyOtp()}
                    className="rounded-2xl bg-gradient-to-r from-[#5f4be8] via-[#7460f1] to-[#8b77ff] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105 disabled:opacity-60"
                  >
                    {fpLoading ? "Checking..." : "Verify OTP"}
                  </button>
                </>
              ) : null}
              {fpStep === 3 ? (
                <>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => {
                      setFpStep(2);
                      setFpMsg(null);
                    }}
                    className="rounded-2xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={fpLoading}
                    onClick={() => void onResetPassword()}
                    className="rounded-2xl bg-gradient-to-r from-[#5f4be8] via-[#7460f1] to-[#8b77ff] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105 disabled:opacity-60"
                  >
                    {fpLoading ? "Saving..." : "Update password"}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
