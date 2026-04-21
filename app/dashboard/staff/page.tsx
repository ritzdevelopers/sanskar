"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import "jodit/es2021/jodit.min.css";

import { API_BASE, downloadCareerResumeFromPath, parseJson } from "../lib";

type Row = Record<string, unknown>;
type StaffUser = {
  _id?: string;
  name?: string;
  email?: string;
  role?: "superadmin" | "admin" | "editor" | string;
  permissions?: boolean;
};

type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

const LIST_LIMIT = 10;

const defaultPagination: PaginationMeta = {
  page: 1,
  limit: LIST_LIMIT,
  totalItems: 0,
  totalPages: 1,
  hasPrevPage: false,
  hasNextPage: false,
};

function fmtDate(value: unknown) {
  if (!value) return "-";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString();
}

/** True if rich-text HTML has visible text (not only empty tags). */
function blogDescriptionHasContent(html: string) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0;
}

function fmtSubmittedAt(row: Row) {
  const iso = row.createdAt ?? row.updatedAt;
  if (iso) {
    const d = new Date(String(iso));
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }
  }
  const idVal = row._id;
  const idStr =
    idVal != null && typeof idVal === "object" && "toString" in idVal
      ? String((idVal as { toString: () => string }).toString())
      : typeof idVal === "string"
        ? idVal
        : "";
  if (/^[a-f0-9]{24}$/i.test(idStr)) {
    const ts = Number.parseInt(idStr.slice(0, 8), 16) * 1000;
    const d = new Date(ts);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }
  }
  return "-";
}

function asList(payload: Record<string, unknown>) {
  const data = payload.data;
  if (Array.isArray(data)) return data as Row[];
  const users = payload.users;
  if (Array.isArray(users)) return users as Row[];
  return [];
}

function asPagination(payload: Record<string, unknown>): PaginationMeta {
  const p = payload.pagination;
  if (!p || typeof p !== "object") return defaultPagination;
  const pp = p as Record<string, unknown>;
  return {
    page: Number(pp.page || 1),
    limit: Number(pp.limit || LIST_LIMIT),
    totalItems: Number(pp.totalItems || 0),
    totalPages: Math.max(1, Number(pp.totalPages || 1)),
    hasPrevPage: Boolean(pp.hasPrevPage),
    hasNextPage: Boolean(pp.hasNextPage),
  };
}

function stripHtmlForPreview(text: unknown): string {
  return String(text ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function blogWordPreview(text: unknown, maxWords: number): string {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "—";
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

export default function StaffDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<StaffUser | null>(null);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "enquiry" | "contact" | "career" | "nri" | "staff" | "footer" | "blog"
  >("dashboard");

  const [enquiryRows, setEnquiryRows] = useState<Row[]>([]);
  const [contactRows, setContactRows] = useState<Row[]>([]);
  const [careerRows, setCareerRows] = useState<Row[]>([]);
  const [nriRows, setNriRows] = useState<Row[]>([]);
  const [staffRows, setStaffRows] = useState<Row[]>([]);
  const [footerRows, setFooterRows] = useState<Row[]>([]);
  const [blogRows, setBlogRows] = useState<Row[]>([]);
  const [addBlogOpen, setAddBlogOpen] = useState(false);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogFormErr, setBlogFormErr] = useState<string | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addMetaDescription, setAddMetaDescription] = useState("");
  const [addMetaKeywords, setAddMetaKeywords] = useState("");
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addImagePreviewUrl, setAddImagePreviewUrl] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Row | null>(null);
  const [previewBlog, setPreviewBlog] = useState<Row | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      height: 300,
      toolbarAdaptive: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_only_text" as const,
      defaultActionOnPasteFromWord: "insert_only_text" as const,
      editorClassName: "jodit-staff-rich",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "link",
        "image",
        "table",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
    }),
    [],
  );

  const [enquiryPage, setEnquiryPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [careerPage, setCareerPage] = useState(1);
  const [nriPage, setNriPage] = useState(1);
  const [staffPage, setStaffPage] = useState(1);
  const [footerPage, setFooterPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);

  const [enquiryPg, setEnquiryPg] = useState<PaginationMeta>(defaultPagination);
  const [contactPg, setContactPg] = useState<PaginationMeta>(defaultPagination);
  const [careerPg, setCareerPg] = useState<PaginationMeta>(defaultPagination);
  const [nriPg, setNriPg] = useState<PaginationMeta>(defaultPagination);
  const [staffPg, setStaffPg] = useState<PaginationMeta>(defaultPagination);
  const [footerPg, setFooterPg] = useState<PaginationMeta>(defaultPagination);
  const [blogPg, setBlogPg] = useState<PaginationMeta>(defaultPagination);

  const [listsLoading, setListsLoading] = useState(false);
  const [listsError, setListsError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const role = String(user?.role || "").toLowerCase();
  const canAccess = Boolean(user?.permissions);
  const allowedRole = role === "admin" || role === "editor";
  const metricItems =
    role === "editor"
      ? [
          { label: "Blog", value: blogPg.totalItems },
          { label: "Staff", value: staffPg.totalItems },
        ]
      : [
          { label: "Enquiry", value: enquiryPg.totalItems },
          { label: "Contact", value: contactPg.totalItems },
          { label: "Career", value: careerPg.totalItems },
          { label: "NRI", value: nriPg.totalItems },
          { label: "Staff", value: staffPg.totalItems },
          { label: "Footer", value: footerPg.totalItems },
        ];
  const chartMax = Math.max(...metricItems.map((x) => x.value), 1);
  const chartCount = metricItems.length;
  const chartXStep = chartCount > 1 ? 340 / (chartCount - 1) : 0;
  const chartLineEndX = 20 + (chartCount - 1) * chartXStep;
  const graphPoints = metricItems
    .map((item, i) => {
      const x = chartCount > 1 ? 20 + i * chartXStep : 200;
      const y = 170 - Math.round((item.value / chartMax) * 130);
      return `${x},${y}`;
    })
    .join(" ");
  const totalRecords = metricItems.reduce((sum, item) => sum + item.value, 0);
  const activeListPagination = useMemo(() => {
    switch (activeTab) {
      case "enquiry":
        return enquiryPg;
      case "contact":
        return contactPg;
      case "career":
        return careerPg;
      case "nri":
        return nriPg;
      case "staff":
        return staffPg;
      case "footer":
        return footerPg;
      case "blog":
        return blogPg;
      default:
        return defaultPagination;
    }
  }, [activeTab, enquiryPg, contactPg, careerPg, nriPg, staffPg, footerPg, blogPg]);
  let currentAngle = 0;
  const pieColors = [
    "#4f46e5",
    "#0ea5e9",
    "#14b8a6",
    "#8b5cf6",
    "#f59e0b",
    "#ec4899",
  ];
  const pieGradient = metricItems
    .map((item, idx) => {
      const value = totalRecords > 0 ? item.value : 1;
      const span = totalRecords > 0 ? (value / totalRecords) * 360 : 360 / metricItems.length;
      const start = currentAngle;
      const end = currentAngle + span;
      currentAngle = end;
      return `${pieColors[idx]} ${start}deg ${end}deg`;
    })
    .join(", ");

  useEffect(() => {
    let mounted = true;
    async function loadMe() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          credentials: "include",
        });
        const data = await parseJson(res);
        if (!res.ok) {
          if (res.status === 401) {
            router.replace("/dashboard/login");
            return;
          }
          throw new Error(String(data.message || "Unable to load profile"));
        }
        const nextUser = (data.user || null) as StaffUser | null;
        if (!mounted) return;
        if (nextUser?.role === "superadmin") {
          router.replace("/dashboard/superadmin");
          return;
        }
        setUser(nextUser);
      } catch (err) {
        if (!mounted) return;
        router.replace("/dashboard/login");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadMe();
    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (!allowedRole || !canAccess) return;
    let mounted = true;
    async function loadLists() {
      setListsLoading(true);
      setListsError(null);
      try {
        const makeUrl = (path: string, page: number) =>
          `${API_BASE}${path}?page=${page}&limit=${LIST_LIMIT}`;

        const [enqRes, conRes, carRes, nriRes, stfRes, footRes, blogRes] = await Promise.all([
          fetch(makeUrl("/api/users/get-all-users", enquiryPage), {
            credentials: "include",
          }),
          fetch(makeUrl("/api/users/get-contact-us-data", contactPage), {
            credentials: "include",
          }),
          fetch(makeUrl("/api/users/get-carrer-form-data", careerPage), {
            credentials: "include",
          }),
          fetch(makeUrl("/api/users/get-nri-form-data", nriPage), {
            credentials: "include",
          }),
          fetch(makeUrl("/api/users/get-all-staff-users", staffPage), {
            credentials: "include",
          }),
          fetch(makeUrl("/api/users/get-footer-email-data", footerPage), {
            credentials: "include",
          }),
          fetch(makeUrl("/api/users/get-blog-data", blogPage), {
            credentials: "include",
          }),
        ]);

        const [enqData, conData, carData, nriData, stfData, footData, blogData] = await Promise.all([
          parseJson(enqRes),
          parseJson(conRes),
          parseJson(carRes),
          parseJson(nriRes),
          parseJson(stfRes),
          parseJson(footRes),
          parseJson(blogRes),
        ]);

        const allOk =
          enqRes.ok &&
          conRes.ok &&
          carRes.ok &&
          nriRes.ok &&
          stfRes.ok &&
          footRes.ok &&
          blogRes.ok;
        if (!allOk) {
          const msg =
            String(
              enqData.message ||
                conData.message ||
                carData.message ||
                nriData.message ||
                stfData.message ||
                footData.message ||
                blogData.message ||
                "Unable to fetch dashboard data",
            ) || "Unable to fetch dashboard data";
          throw new Error(msg);
        }
        if (!mounted) return;
        setEnquiryRows(asList(enqData));
        setContactRows(asList(conData));
        setCareerRows(asList(carData));
        setNriRows(asList(nriData));
        setStaffRows(asList(stfData));
        setFooterRows(asList(footData));
        setBlogRows(asList(blogData));

        setEnquiryPg(asPagination(enqData));
        setContactPg(asPagination(conData));
        setCareerPg(asPagination(carData));
        setNriPg(asPagination(nriData));
        setStaffPg(asPagination(stfData));
        setFooterPg(asPagination(footData));
        setBlogPg(asPagination(blogData));
      } catch (err) {
        if (!mounted) return;
        setListsError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        if (mounted) setListsLoading(false);
      }
    }
    loadLists();
    return () => {
      mounted = false;
    };
  }, [
    allowedRole,
    canAccess,
    enquiryPage,
    contactPage,
    careerPage,
    nriPage,
    staffPage,
    footerPage,
    blogPage,
    refreshTick,
  ]);

  useEffect(() => {
    if (!addImageFile) {
      setAddImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(addImageFile);
    setAddImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [addImageFile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mobileNavOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (role === "admin" && activeTab === "blog") {
      setActiveTab("dashboard");
    }
  }, [activeTab, role]);

  async function refreshBlogRows() {
    const res = await fetch(
      `${API_BASE}/api/users/get-blog-data?page=${blogPage}&limit=${LIST_LIMIT}`,
      { credentials: "include" },
    );
    const data = await parseJson(res);
    if (!res.ok) {
      throw new Error(String(data.message || "Failed to refresh blog data"));
    }
    setBlogRows(asList(data));
    setBlogPg(asPagination(data));
  }

  async function submitBlog() {
    setBlogFormErr(null);
    const title = addTitle.trim();
    const description = addDescription.trim();
    if (!title || !blogDescriptionHasContent(description)) {
      setBlogFormErr("Title and description are required.");
      return;
    }
    if (!addImageFile && !editingBlog) {
      setBlogFormErr("Please choose an image file.");
      return;
    }
    setBlogSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("metaDescription", addMetaDescription.trim());
      fd.append("metaKeywords", addMetaKeywords.trim());
      if (addImageFile) fd.append("image", addImageFile);
      const isEdit = Boolean(editingBlog?._id);
      const endpoint = isEdit
        ? `${API_BASE}/api/users/update-blog-data/${encodeURIComponent(String(editingBlog?._id || ""))}`
        : `${API_BASE}/api/users/send-blog-data`;
      const res = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        body: fd,
        credentials: "include",
      });
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Save failed"));
      }
      setAddTitle("");
      setAddDescription("");
      setAddMetaDescription("");
      setAddMetaKeywords("");
      setAddImageFile(null);
      setEditingBlog(null);
      setAddBlogOpen(false);
      await refreshBlogRows();
    } catch (err) {
      setBlogFormErr(err instanceof Error ? err.message : "Error");
    } finally {
      setBlogSubmitting(false);
    }
  }

  async function deleteBlog(id: string) {
    if (!id) return;
    setDeletingBlogId(id);
    setListsError(null);
    try {
      const res = await fetch(
        `${API_BASE}/api/users/delete-blog-data/${encodeURIComponent(id)}`,
        { method: "DELETE", credentials: "include" },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Delete failed"));
      }
      await refreshBlogRows();
    } catch (err) {
      setListsError(err instanceof Error ? err.message : "Failed to delete blog");
    } finally {
      setDeletingBlogId(null);
    }
  }

  async function onLogout() {
    setMobileNavOpen(false);
    try {
      await fetch(`${API_BASE}/api/users/logout-staff`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/dashboard/login");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <p className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
          Loading staff dashboard...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <div className="mt-4 flex gap-2">
            <Link
              href="/dashboard/login"
              className="cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800"
            >
              Back to login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!allowedRole) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h1 className="text-lg font-semibold text-zinc-900">Access denied</h1>
          <p className="mt-2 text-sm text-zinc-600">
            This page is only for admin/editor staff accounts.
          </p>
          <Link
            href="/dashboard/login"
            className="mt-4 inline-block cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800"
          >
            Login again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f4f5f7] text-zinc-900">
      {mobileNavOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/45 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      {!mobileNavOpen ? (
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={false}
          aria-controls="staff-mobile-nav"
          onClick={() => setMobileNavOpen(true)}
          className="fixed left-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-lg transition hover:bg-zinc-50 lg:hidden"
        >
          <i className="ri-menu-3-line text-2xl leading-none" aria-hidden />
        </button>
      ) : null}

      <div className="grid h-screen grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside
          id="staff-mobile-nav"
          className={`z-50 h-screen w-full max-w-[290px] overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#33101f] via-[#2a0d19] to-[#1f0a14] p-5 text-white shadow-2xl transition-transform duration-300 ease-out lg:relative lg:z-auto lg:block lg:max-w-none lg:translate-x-0 lg:overflow-hidden lg:shadow-none ${
            mobileNavOpen
              ? "fixed left-0 top-0 translate-x-0"
              : "pointer-events-none fixed left-0 top-0 -translate-x-full lg:pointer-events-auto lg:static lg:translate-x-0"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-20 -top-16 h-56 w-56 rounded-full bg-orange-500/35 blur-3xl" />
            <div className="absolute -right-20 top-40 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
          </div>
          <div className="relative flex h-full flex-col">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="mt-1 text-lg font-semibold text-white">
                    {role === "admin" ? "Admin Panel" : "Editor Panel"}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileNavOpen(false)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
                >
                  <i className="ri-close-line text-xl leading-none" aria-hidden />
                </button>
              </div>
            </div>
            <nav className="mt-6 space-y-1 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur">
              <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                Data Menu
              </p>
              {[
                ...(role === "editor"
                  ? [
                      { id: "dashboard", label: "Dashboard" },
                      { id: "blog", label: "Blog" },
                      { id: "staff", label: "Staff" },
                    ]
                  : [
                      { id: "dashboard", label: "Dashboard" },
                      { id: "enquiry", label: "Enquiry" },
                      { id: "contact", label: "Contact" },
                      { id: "career", label: "Career" },
                      { id: "nri", label: "NRI" },
                      { id: "staff", label: "Staff" },
                      { id: "footer", label: "Footer Enquire" },
                    ]),
              ].map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(
                        t.id as
                          | "dashboard"
                          | "enquiry"
                          | "contact"
                          | "career"
                          | "nri"
                          | "blog"
                          | "staff"
                          | "footer",
                      );
                      if (typeof window !== "undefined") {
                        const mq = window.matchMedia("(max-width: 1023px)");
                        if (mq.matches) setMobileNavOpen(false);
                      }
                    }}
                    className={`w-full cursor-pointer rounded-lg px-3 py-3 text-left text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-[#2a0d19] shadow-lg shadow-orange-900/30"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={onLogout}
              className="mt-auto w-full cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </aside>

        <section className="h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="max-lg:ml-[40px] bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-2xl md:text-4xl font-bold tracking-tight text-transparent">
              {role === "admin" ? "Admin Dashboard" : "Editor Dashboard"}
            </h1>
            <p className="max-lg:ml-[40px] text-sm text-zinc-600">
              Welcome {user?.name || "Staff"} ({role})
            </p>
          </header>

          {!canAccess ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
              <p className="text-sm font-semibold text-amber-900">
                Access pending approval
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTab === "dashboard" ? (
                <>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setRefreshTick((n) => n + 1)}
                      disabled={listsLoading}
                      className={`rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium ${
                        listsLoading
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                    >
                      {listsLoading ? "Refreshing..." : "Refresh"}
                    </button>
                  </div>
                  <div className="rounded-3xl border border-indigo-200/70 bg-gradient-to-br from-white/65 via-indigo-50/70 to-cyan-50/70 p-5 shadow-[0_20px_45px_-20px_rgba(67,56,202,0.45)] backdrop-blur-xl ring-1 ring-white/60 sm:p-6">
                    <div className="mb-4 flex items-center justify-between border-b border-indigo-200/60 pb-3">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
                        Dashboard Overview
                      </h2>
                      <span className="rounded-full border border-indigo-200 bg-white/70 px-3 py-1 text-xs font-semibold text-indigo-700">
                        Live
                      </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                      {metricItems.map((x) => (
                        <div
                          key={x.label}
                          className="rounded-2xl border border-white/70 bg-white/65 px-4 py-4 shadow-sm backdrop-blur"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700/70">
                            {x.label}
                          </p>
                          <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-950">
                            {x.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 via-white to-cyan-50/80 p-4 shadow-md ring-1 ring-indigo-100/60">
                      <div className="mb-3 border-b border-indigo-200/50 pb-2">
                        <h2 className="text-base font-bold tracking-tight text-indigo-950">
                          Records Trend
                        </h2>
                        <p className="text-xs text-indigo-900/70">
                          Enquiry, Contact, Career, NRI, Staff, Footer
                        </p>
                      </div>
                      <svg
                        viewBox={`0 0 ${Math.max(380, Math.ceil(chartLineEndX) + 20)} 190`}
                        className="h-56 w-full"
                      >
                        <defs>
                          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#14b8a6" />
                          </linearGradient>
                        </defs>
                        <path
                          d={`M20 170 H${chartLineEndX}`}
                          stroke="#c7d2fe"
                          strokeWidth="1"
                          strokeDasharray="4 5"
                          fill="none"
                        />
                        <polyline
                          points={graphPoints}
                          fill="none"
                          stroke="url(#lineGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {metricItems.map((m, i) => {
                          const x = chartCount > 1 ? 20 + i * chartXStep : 200;
                          const y = 170 - Math.round((m.value / chartMax) * 130);
                          return (
                            <g key={m.label}>
                              <circle cx={x} cy={y} r="5.5" fill="#4f46e5" />
                              <text
                                x={x}
                                y={185}
                                textAnchor="middle"
                                className="fill-indigo-700 text-[10px] font-semibold"
                              >
                                {m.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    <div className="rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-4 shadow-md ring-1 ring-cyan-100/70">
                      <div className="mb-3 border-b border-cyan-200/60 pb-2">
                        <h2 className="text-base font-bold tracking-tight text-cyan-950">
                          Total Records Share
                        </h2>
                        <p className="text-xs text-cyan-900/70">
                          Distribution across all form types
                        </p>
                      </div>
                      <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 sm:flex-row sm:justify-around">
                        <div className="relative flex h-52 w-52 items-center justify-center">
                          <div
                            className="absolute h-full w-full rounded-full shadow-inner ring-2 ring-white/80"
                            style={{ background: `conic-gradient(${pieGradient})` }}
                            aria-hidden
                          />
                          <div className="relative z-10 flex h-[52%] w-[52%] flex-col items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-100">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                              Total
                            </p>
                            <p className="text-2xl font-bold text-zinc-900">{totalRecords}</p>
                          </div>
                        </div>
                        <ul className="grid gap-2 text-sm">
                          {metricItems.map((item, idx) => (
                            <li key={item.label} className="flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-sm"
                                style={{ backgroundColor: pieColors[idx] }}
                              />
                              <span className="font-medium text-zinc-800">{item.label}</span>
                              <span className="text-zinc-600">
                                {item.value}
                                {totalRecords > 0 ? (
                                  <span className="text-zinc-400">
                                    {" "}
                                    ({Math.round((item.value / totalRecords) * 100)}%)
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-700">
                      Form data details
                    </p>
                    <div className="flex items-center gap-2">
                      {activeTab === "blog" && role === "editor" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setBlogFormErr(null);
                            setEditingBlog(null);
                            setAddTitle("");
                            setAddDescription("");
                            setAddMetaDescription("");
                            setAddMetaKeywords("");
                            setAddImageFile(null);
                            setAddBlogOpen(true);
                          }}
                          disabled={listsLoading}
                          className="cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          Add blog
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setRefreshTick((n) => n + 1)}
                        disabled={listsLoading}
                        className={`rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium ${
                          listsLoading
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }`}
                      >
                        {listsLoading ? "Refreshing..." : "Refresh"}
                      </button>
                    </div>
                  </div>
                  {listsError ? (
                    <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {listsError}
                    </p>
                  ) : null}
                  {listsLoading ? (
                    <p className="text-sm text-zinc-600">Loading records...</p>
                  ) : null}

                  {!listsLoading && activeTab === "enquiry" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Mobile</th>
                            <th className="px-3 py-2">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiryRows.map((r, i) => (
                            <tr key={String(r._id || i)} className="border-t">
                              <td className="px-3 py-2">
                                {String(r.firstName || "")} {String(r.lastName || "")}
                              </td>
                              <td className="px-3 py-2">{String(r.email || "-")}</td>
                              <td className="px-3 py-2">{String(r.mobile || "-")}</td>
                              <td className="px-3 py-2">{fmtDate(r.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && activeTab === "contact" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Mobile</th>
                            <th className="px-3 py-2">Message</th>
                            <th className="px-3 py-2">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contactRows.map((r, i) => (
                            <tr key={String(r._id || i)} className="border-t">
                              <td className="px-3 py-2">{String(r.name || "-")}</td>
                              <td className="px-3 py-2">{String(r.email || "-")}</td>
                              <td className="px-3 py-2">{String(r.mobile || "-")}</td>
                              <td className="px-3 py-2">{String(r.message || "-")}</td>
                              <td className="px-3 py-2">{fmtDate(r.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && activeTab === "career" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Mobile</th>
                            <th className="px-3 py-2">Designation</th>
                            <th className="px-3 py-2">Resume</th>
                            <th className="px-3 py-2">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {careerRows.map((r, i) => (
                            <tr key={String(r._id || i)} className="border-t">
                              <td className="px-3 py-2">{String(r.name || "-")}</td>
                              <td className="px-3 py-2">{String(r.email || "-")}</td>
                              <td className="px-3 py-2">{String(r.mobile || "-")}</td>
                              <td className="px-3 py-2">{String(r.designation || "-")}</td>
                              <td className="px-3 py-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="max-w-[200px] truncate">
                                    {String(r.resume || "-")}
                                  </span>
                                  {r.resume ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        void downloadCareerResumeFromPath(String(r.resume))
                                      }
                                      className="cursor-pointer shrink-0 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-semibold hover:bg-zinc-50"
                                    >
                                      Download
                                    </button>
                                  ) : null}
                                </div>
                              </td>
                              <td className="px-3 py-2">{fmtDate(r.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && activeTab === "nri" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Mobile</th>
                            <th className="px-3 py-2">Message</th>
                            <th className="px-3 py-2">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nriRows.map((r, i) => (
                            <tr key={String(r._id || i)} className="border-t">
                              <td className="px-3 py-2">{String(r.name || "-")}</td>
                              <td className="px-3 py-2">{String(r.email || "-")}</td>
                              <td className="px-3 py-2">{String(r.mobile || "-")}</td>
                              <td className="px-3 py-2">{String(r.message || "-")}</td>
                              <td className="px-3 py-2">{fmtDate(r.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && activeTab === "footer" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {footerRows.map((r, i) => (
                            <tr key={String(r._id || r.email || i)} className="border-t">
                              <td className="px-3 py-2">{String(r.email || "-")}</td>
                              <td className="px-3 py-2">{fmtSubmittedAt(r)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && activeTab === "staff" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Role</th>
                            <th className="px-3 py-2">Permission</th>
                            <th className="px-3 py-2">Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staffRows.map((r, i) => (
                            <tr key={String(r._id || i)} className="border-t">
                              <td className="px-3 py-2">{String(r.name || "-")}</td>
                              <td className="px-3 py-2">{String(r.email || "-")}</td>
                              <td className="px-3 py-2">{String(r.role || "-")}</td>
                              <td className="px-3 py-2">
                                {r.permissions ? "Enabled" : "Disabled"}
                              </td>
                              <td className="px-3 py-2">{fmtDate(r.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && activeTab === "blog" && role === "editor" ? (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-left text-[17px]">
                        <thead className="bg-zinc-100 text-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Title</th>
                            <th className="px-3 py-2">Description</th>
                            <th className="px-3 py-2">Image</th>
                            <th className="px-3 py-2">Date</th>
                            <th className="px-3 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogRows.map((r, i) => (
                            <tr key={String(r._id || i)} className="border-t">
                              <td
                                className="max-w-[220px] px-3 py-2"
                                title={String(r.title || "")}
                              >
                                {blogWordPreview(r.title, 2)}
                              </td>
                              <td
                                className="max-w-[360px] px-3 py-2"
                                title={stripHtmlForPreview(r.description)}
                              >
                                {blogWordPreview(stripHtmlForPreview(r.description), 8)}
                              </td>
                              <td className="px-3 py-2">
                                {typeof r.image === "string" && r.image ? (
                                  <a
                                    href={`${API_BASE}/${r.image.replace(/^\/+/, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block cursor-pointer"
                                  >
                                    <img
                                      src={`${API_BASE}/${r.image.replace(/^\/+/, "")}`}
                                      alt=""
                                      className="h-12 w-16 rounded border border-zinc-200 object-cover"
                                    />
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td className="px-3 py-2">{fmtSubmittedAt(r)}</td>
                              <td className="px-3 py-2">
                                <div className="flex flex-wrap gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewBlog(r)}
                                    className="cursor-pointer rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-emerald-700 hover:bg-emerald-100"
                                    title="Preview"
                                  >
                                    <i className="ri-eye-line text-[16px]" aria-hidden />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingBlog(r);
                                      setAddTitle(String(r.title || ""));
                                      setAddDescription(String(r.description || ""));
                                      setAddMetaDescription(String(r.metaDescription ?? ""));
                                      setAddMetaKeywords(String(r.metaKeywords ?? ""));
                                      setAddImageFile(null);
                                      setBlogFormErr(null);
                                      setAddBlogOpen(true);
                                    }}
                                    className="cursor-pointer rounded-md border border-zinc-300 bg-zinc-100 px-2 py-1 text-zinc-700 hover:bg-zinc-200"
                                    title="Edit"
                                  >
                                    <i className="ri-pencil-line text-[16px]" aria-hidden />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={deletingBlogId === String(r._id)}
                                    onClick={() => void deleteBlog(String(r._id || ""))}
                                    className="cursor-pointer rounded-md border border-red-300 bg-red-50 px-2 py-1 text-red-700 hover:bg-red-100 disabled:opacity-50"
                                    title="Delete"
                                  >
                                    <i className="ri-delete-bin-line text-[16px]" aria-hidden />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {!listsLoading && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={!activeListPagination.hasPrevPage}
                        onClick={() => {
                          if (activeTab === "enquiry" && enquiryPg.hasPrevPage)
                            setEnquiryPage((p) => p - 1);
                          if (activeTab === "contact" && contactPg.hasPrevPage)
                            setContactPage((p) => p - 1);
                          if (activeTab === "career" && careerPg.hasPrevPage)
                            setCareerPage((p) => p - 1);
                          if (activeTab === "nri" && nriPg.hasPrevPage)
                            setNriPage((p) => p - 1);
                          if (activeTab === "staff" && staffPg.hasPrevPage)
                            setStaffPage((p) => p - 1);
                          if (activeTab === "footer" && footerPg.hasPrevPage)
                            setFooterPage((p) => p - 1);
                          if (activeTab === "blog" && blogPg.hasPrevPage)
                            setBlogPage((p) => p - 1);
                        }}
                        className={`rounded-lg border border-zinc-300 px-3 py-1.5 text-sm ${
                          activeListPagination.hasPrevPage
                            ? "cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        disabled={!activeListPagination.hasNextPage}
                        onClick={() => {
                          if (activeTab === "enquiry" && enquiryPg.hasNextPage)
                            setEnquiryPage((p) => p + 1);
                          if (activeTab === "contact" && contactPg.hasNextPage)
                            setContactPage((p) => p + 1);
                          if (activeTab === "career" && careerPg.hasNextPage)
                            setCareerPage((p) => p + 1);
                          if (activeTab === "nri" && nriPg.hasNextPage)
                            setNriPage((p) => p + 1);
                          if (activeTab === "staff" && staffPg.hasNextPage)
                            setStaffPage((p) => p + 1);
                          if (activeTab === "footer" && footerPg.hasNextPage)
                            setFooterPage((p) => p + 1);
                          if (activeTab === "blog" && blogPg.hasNextPage)
                            setBlogPage((p) => p + 1);
                        }}
                        className={`rounded-lg border border-zinc-300 px-3 py-1.5 text-sm ${
                          activeListPagination.hasNextPage
                            ? "cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </section>
      </div>
      {addBlogOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-blog-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-amber-200 bg-white p-6 shadow-xl"
          >
            <h3 id="add-blog-title" className="text-lg font-bold text-amber-950">
              {editingBlog ? "Edit blog" : "Add blog"}
            </h3>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700" htmlFor="add-blog-title-input">
                  Title
                </label>
                <input
                  id="add-blog-title-input"
                  type="text"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-700" id="add-blog-description-label">
                  Description
                </span>
                <div
                  className="mt-1 overflow-hidden rounded-lg border border-zinc-300 bg-white [&_.jodit-container]:!border-0"
                  aria-labelledby="add-blog-description-label"
                >
                  <JoditEditor
                    value={addDescription}
                    config={joditConfig}
                    onChange={(html) => setAddDescription(html)}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-zinc-700"
                  htmlFor="add-blog-meta-description"
                >
                  Meta description
                </label>
                <textarea
                  id="add-blog-meta-description"
                  value={addMetaDescription}
                  onChange={(e) => setAddMetaDescription(e.target.value)}
                  rows={2}
                  placeholder="SEO meta description (optional)"
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-zinc-700"
                  htmlFor="add-blog-meta-keywords"
                >
                  Meta keywords
                </label>
                <input
                  id="add-blog-meta-keywords"
                  type="text"
                  value={addMetaKeywords}
                  onChange={(e) => setAddMetaKeywords(e.target.value)}
                  placeholder="keyword one, keyword two (optional)"
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700" htmlFor="add-blog-image">
                  Image
                </label>
                <input
                  id="add-blog-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAddImageFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full cursor-pointer text-sm"
                />
                {addImagePreviewUrl ? (
                  <div className="mt-2">
                    <p className="text-[11px] font-semibold text-zinc-600">Preview</p>
                    <img
                      src={addImagePreviewUrl}
                      alt="Selected cover preview"
                      className="mt-1 max-h-48 w-full max-w-xs rounded-lg border border-amber-200 object-contain"
                    />
                  </div>
                ) : null}
              </div>
              {blogFormErr ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs text-red-800">
                  {blogFormErr}
                </p>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                disabled={blogSubmitting}
                onClick={() => {
                  setAddBlogOpen(false);
                  setBlogFormErr(null);
                  setAddTitle("");
                  setAddDescription("");
                  setAddImageFile(null);
                  setAddMetaDescription("");
                  setAddMetaKeywords("");
                  setEditingBlog(null);
                }}
                className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={blogSubmitting}
                onClick={() => void submitBlog()}
                className="cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {blogSubmitting ? "Saving..." : editingBlog ? "Save changes" : "Save blog"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {previewBlog ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 p-4"
          role="presentation"
          onClick={() => setPreviewBlog(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-preview-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-amber-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 id="blog-preview-title" className="text-lg font-bold text-amber-950">
                {String(previewBlog.title || "Blog preview")}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewBlog(null)}
                className="cursor-pointer rounded-lg border border-zinc-300 px-2 py-1 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Close
              </button>
            </div>
            <div
              className="staff-blog-html mt-3 overflow-x-auto text-sm leading-relaxed text-zinc-800 [&_img]:max-h-[50vh] [&_img]:max-w-full [&_img]:rounded-lg [&_a]:text-emerald-700 [&_a]:underline [&_table]:min-w-full [&_table]:border [&_table]:border-zinc-300 [&_table_th]:border [&_table_th]:border-zinc-300 [&_table_th]:bg-zinc-100 [&_table_th]:px-3 [&_table_th]:py-2 [&_table_td]:border [&_table_td]:border-zinc-300 [&_table_td]:px-3 [&_table_td]:py-2"
              dangerouslySetInnerHTML={{
                __html: String(previewBlog.description || ""),
              }}
            />
            {String(previewBlog.metaDescription ?? "").trim() ? (
              <p className="mt-3 text-xs text-zinc-600">
                <span className="font-semibold text-zinc-700">Meta description: </span>
                {String(previewBlog.metaDescription)}
              </p>
            ) : null}
            {String(previewBlog.metaKeywords ?? "").trim() ? (
              <p className="mt-1 text-xs text-zinc-600">
                <span className="font-semibold text-zinc-700">Meta keywords: </span>
                {String(previewBlog.metaKeywords)}
              </p>
            ) : null}
            {typeof previewBlog.image === "string" && previewBlog.image ? (
              <div className="mt-4">
                <p className="text-xs font-semibold text-zinc-600">Image</p>
                <img
                  src={`${API_BASE}/${previewBlog.image.replace(/^\/+/, "")}`}
                  alt=""
                  className="mt-2 max-h-[50vh] w-full rounded-lg border border-amber-200 object-contain"
                />
              </div>
            ) : null}
            <p className="mt-3 text-xs text-zinc-500">{fmtSubmittedAt(previewBlog)}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
