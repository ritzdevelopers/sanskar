"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { API_BASE, parseJson } from "../lib";

function staggerClass(i: number) {
  return { animationDelay: `${80 + i * 70}ms` } as const;
}

export default function DashboardRegisterPage() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [regRole, setRegRole] = useState<"admin" | "editor">("editor");
  const [regLoading, setRegLoading] = useState(false);
  const [regMsg, setRegMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const [tokenHint, setTokenHint] = useState<string | null>(null);

  const setHintFromToken = useCallback((t: unknown) => {
    if (typeof t === "string" && t.length > 20) {
      setTokenHint(`${t.slice(0, 12)}…${t.slice(-6)}`);
    } else {
      setTokenHint(null);
    }
  }, []);

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegMsg(null);
    setRegLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/register-staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          role: regRole,
        }),
      });
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Register failed"));
      }
      setHintFromToken(data.token);
      setRegMsg({
        type: "ok",
        text: "User created successfully. Please login to continue.",
      });
      setRegPassword("");
    } catch (err) {
      setRegMsg({
        type: "err",
        text: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setRegLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/35 bg-white/90 px-4 py-2.5 text-[15px] text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-[#F7A51D] focus:ring-2 focus:ring-[#F7A51D]/35";

  return (
    <main className="h-screen overflow-hidden  px-4 py-3 sm:px-6 sm:py-4">
      <div className="mx-auto h-full w-full max-w-[1252px]">
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-black/20 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)] ">
          <Image
            src="/assets/eternia-home.jpg"
            alt="Sanskar register background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 lg:flex-row lg:items-center lg:px-10">
            <div className="hidden max-w-[380px] text-white lg:block">
              <p className="text-xs font-semibold tracking-[0.25em] text-white/80">
                SANSKAR GROUP
              </p>
              <h1 className="mt-4 text-6xl font-bold leading-[0.95] drop-shadow-lg">
                Register
              </h1>
              <p className="mt-5 text-base text-white/80">
                Create your staff account to manage projects, users, and
                dashboard operations securely.
              </p>
            </div>

            <div className="ml-auto w-full max-w-[520px] rounded-[2rem] border border-white/35 bg-white/18 p-5 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-7">
              <div
                className="animate-register-fade-up mb-2"
                style={staggerClass(0)}
              >
                <span className="inline-flex rounded-full border border-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  Staff Register
                </span>
              </div>

              <div className="mb-3 flex items-start justify-between gap-3">
                <h2
                  className="animate-register-fade-up text-4xl font-bold leading-none text-white"
                  style={staggerClass(1)}
                >
                  Sign Up
                </h2>
                <p
                  className="animate-register-fade-up pt-2 text-sm text-white/90"
                  style={staggerClass(2)}
                >
                  Have account?{" "}
                  <Link href="/dashboard/login" className="font-bold underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {regMsg ? (
                <div
                  role="alert"
                  style={staggerClass(2)}
                  className={`animate-register-fade-up mb-4 rounded-xl border px-3 py-2 text-sm ${
                    regMsg.type === "ok"
                      ? "border-emerald-200/80 bg-emerald-50/95 text-emerald-900"
                      : "border-red-200/80 bg-red-50/95 text-red-900"
                  }`}
                >
                  {regMsg.text}
                </div>
              ) : null}

              {tokenHint ? (
                <p
                  className="animate-register-fade-up mb-3 rounded-lg border border-white/30 bg-white/15 px-3 py-2 text-xs text-white/85"
                  style={staggerClass(2)}
                >
                  Token preview:{" "}
                  <code className="font-mono text-white">{tokenHint}</code>
                </p>
              ) : null}

              <form onSubmit={onRegister} className="mt-2 flex flex-col gap-3">
                <div
                  className="animate-register-fade-up"
                  style={staggerClass(3)}
                >
                  <label
                    htmlFor="reg-full-name"
                    className="mb-1 block text-sm font-semibold text-white"
                  >
                    Full name
                  </label>
                  <input
                    id="reg-full-name"
                    required
                    autoComplete="name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div
                  className="animate-register-fade-up"
                  style={staggerClass(4)}
                >
                  <label
                    htmlFor="reg-email"
                    className="mb-1 block text-sm font-semibold text-white"
                  >
                    Email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>

                <div
                  className="animate-register-fade-up"
                  style={staggerClass(5)}
                >
                  <label
                    htmlFor="reg-password"
                    className="mb-1 block text-sm font-semibold text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <i
                        className={
                          showPassword
                            ? "ri-eye-off-line text-lg leading-none"
                            : "ri-eye-line text-lg leading-none"
                        }
                        aria-hidden
                      />
                    </button>
                  </div>
                </div>

                <div
                  className="animate-register-fade-up"
                  style={staggerClass(6)}
                >
                  <label
                    htmlFor="reg-role"
                    className="mb-1 block text-sm font-semibold text-white"
                  >
                    Role
                  </label>
                  <select
                    id="reg-role"
                    value={regRole}
                    onChange={(e) =>
                      setRegRole(e.target.value as "admin" | "editor")
                    }
                    className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div
                  className="animate-register-fade-up pt-2"
                  style={staggerClass(7)}
                >
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full rounded-xl bg-[#F7A51D] py-3 text-[15px] font-bold tracking-wide text-[#1f2937] shadow-md shadow-[#F7A51D]/35 transition hover:brightness-105 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {regLoading ? "Submitting..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
