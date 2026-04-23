"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { API_BASE, downloadCareerResumeFromPath, parseJson } from "../lib";

const STAFF_ROLE_KEY = "dashboardStaffRole";

type StaffRow = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  permissions?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type PaginationInfo = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

function totalItemsFromApi(data: Record<string, unknown>): number {
  const p = data.pagination;
  if (
    p &&
    typeof p === "object" &&
    typeof (p as PaginationInfo).totalItems === "number"
  ) {
    return (p as PaginationInfo).totalItems;
  }
  const list = data.data ?? data.users;
  return Array.isArray(list) ? list.length : 0;
}

type SubmittedAtRow = {
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
};

function formatSubmittedAtDisplay(row: SubmittedAtRow): string {
  const iso = row.createdAt ?? row.updatedAt;
  if (iso) {
    const d = new Date(iso);
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
  const idStr =
    row._id != null && typeof row._id === "object" && "toString" in row._id
      ? String((row._id as { toString: () => string }).toString())
      : typeof row._id === "string"
        ? row._id
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
  return "—";
}

type SummaryInfo = {
  totalStaff: number;
  totalAdmin: number;
  totalEditor: number;
  totalAccess: number;
};

type DataSection =
  | "staff"
  | "enquiry"
  | "contact"
  | "career"
  | "nri"
  | "blog"
  | "footer"
  | "careerpost"
  | "brochure";

type EnquiryRow = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  createdAt?: string;
};

type ContactRow = {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
  createdAt?: string;
};

type CareerRow = {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  designation?: string;
  message?: string;
  resume?: string;
  createdAt?: string;
};

type NriRow = {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
  createdAt?: string;
};

type FooterEmailRow = {
  _id?: string;
  email?: string;
  createdAt?: string;
};

type BlogRow = {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  uploadDate?: string;
  createdAt?: string;
};

type CareerPostRow = {
  _id?: string;
  profile?: string;
  description?: string;
  createdAt?: string;
};

type BrochureRow = {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  project?: string;
  createdAt?: string;
};

function blogTwoWordPreview(text: string | undefined): string {
  const rawText = String(text ?? "").trim();
  const plainText =
    typeof window !== "undefined"
      ? (() => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(rawText, "text/html");
          return doc.body.textContent ?? "";
        })()
      : rawText.replace(/<[^>]+>/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  if (words.length <= 2) return words.join(" ");
  return `${words[0]} ${words[1]}...`;
}

function careerPostApiBases(): string[] {
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
  const bases = isLocal ? ["http://localhost:3001", API_BASE] : [API_BASE];
  return Array.from(new Set(bases.map((b) => b.replace(/\/+$/, ""))));
}

type FormOverviewCounts = {
  enquiry: number;
  contact: number;
  career: number;
  nri: number;
};

export default function SuperAdminHomePage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [staff, setStaff] = useState<StaffRow[] | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [summary, setSummary] = useState<SummaryInfo | null>(null);
  const [activeSection, setActiveSection] = useState<DataSection | null>("staff");
  const [enquiryData, setEnquiryData] = useState<EnquiryRow[] | null>(null);
  const [enquiryPage, setEnquiryPage] = useState(1);
  const enquiryPageRef = useRef(enquiryPage);
  const [enquiryPagination, setEnquiryPagination] = useState<PaginationInfo | null>(
    null,
  );
  enquiryPageRef.current = enquiryPage;
  const [contactData, setContactData] = useState<ContactRow[] | null>(null);
  const [contactPage, setContactPage] = useState(1);
  const contactPageRef = useRef(contactPage);
  const [contactPagination, setContactPagination] = useState<PaginationInfo | null>(
    null,
  );
  contactPageRef.current = contactPage;
  const [brochureData, setBrochureData] = useState<BrochureRow[] | null>(null);
  const [brochurePage, setBrochurePage] = useState(1);
  const brochurePageRef = useRef(brochurePage);
  const [brochurePagination, setBrochurePagination] = useState<PaginationInfo | null>(
    null,
  );
  brochurePageRef.current = brochurePage;
  const [careerData, setCareerData] = useState<CareerRow[] | null>(null);
  const [careerPage, setCareerPage] = useState(1);
  const careerPageRef = useRef(careerPage);
  const [careerPagination, setCareerPagination] = useState<PaginationInfo | null>(
    null,
  );
  careerPageRef.current = careerPage;
  const [nriData, setNriData] = useState<NriRow[] | null>(null);
  const [nriPage, setNriPage] = useState(1);
  const nriPageRef = useRef(nriPage);
  const [nriPagination, setNriPagination] = useState<PaginationInfo | null>(null);
  nriPageRef.current = nriPage;
  const [footerData, setFooterData] = useState<FooterEmailRow[] | null>(null);
  const [footerPage, setFooterPage] = useState(1);
  const footerPageRef = useRef(footerPage);
  const [footerPagination, setFooterPagination] = useState<PaginationInfo | null>(
    null,
  );
  footerPageRef.current = footerPage;
  const [blogData, setBlogData] = useState<BlogRow[] | null>(null);
  const [blogPage, setBlogPage] = useState(1);
  const blogPageRef = useRef(blogPage);
  const [blogPagination, setBlogPagination] = useState<PaginationInfo | null>(null);
  blogPageRef.current = blogPage;
  const [addBlogOpen, setAddBlogOpen] = useState(false);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogFormErr, setBlogFormErr] = useState<string | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addImagePreviewUrl, setAddImagePreviewUrl] = useState<string | null>(null);
  const [previewBlog, setPreviewBlog] = useState<BlogRow | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogRow | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [careerPostSubmitting, setCareerPostSubmitting] = useState(false);
  const [careerPostFormErr, setCareerPostFormErr] = useState<string | null>(null);
  const [careerPostSavedMsg, setCareerPostSavedMsg] = useState<string | null>(null);
  const [careerPostProfile, setCareerPostProfile] = useState("");
  const [careerPostDescription, setCareerPostDescription] = useState("");
  const [formOverview, setFormOverview] = useState<FormOverviewCounts>({
    enquiry: 0,
    contact: 0,
    career: 0,
    nri: 0,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [permissionsSavingId, setPermissionsSavingId] = useState<string | null>(
    null,
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sectionMeta: { key: DataSection; label: string }[] = [
    { key: "staff", label: "Staff Registration Data" },
    { key: "enquiry", label: "Enquiry Form Data" },
    { key: "contact", label: "Contact Us Form Data" },
    { key: "career", label: "Career Form Data" },
    { key: "nri", label: "NRI Form Data" },
    { key: "careerpost", label: "Carrer Data Post" },
    { key: "blog", label: "Blog" },
    { key: "footer", label: "Footer Enquire" },
    { key: "brochure", label: "Download Brochure" },
  ];

  const loadStaff = useCallback(async (targetPage = page) => {
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(targetPage),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-all-staff-users?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Fetch failed"));
      }
      const list = data.data;
      setStaff(Array.isArray(list) ? (list as StaffRow[]) : []);
      if (
        data.pagination &&
        typeof data.pagination === "object" &&
        data.summary &&
        typeof data.summary === "object"
      ) {
        setPagination(data.pagination as PaginationInfo);
        setSummary(data.summary as SummaryInfo);
      } else {
        setPagination(null);
        setSummary(null);
      }
      setPage(targetPage);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setStaff(null);
      setPagination(null);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [limit, page]);

  const deleteStaffUser = useCallback(
    async (id: string) => {
      if (!id) return;
      setDeletingId(id);
      setErr(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/users/delete-access-user/${encodeURIComponent(id)}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );
        const data = await parseJson(res);
        if (!res.ok) {
          throw new Error(String(data.message || "Delete failed"));
        }
        const onlyRowOnPage = (staff?.length ?? 0) === 1;
        await loadStaff(onlyRowOnPage && page > 1 ? page - 1 : page);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Error");
      } finally {
        setDeletingId(null);
      }
    },
    [loadStaff, page, staff?.length],
  );

  const updateUserPermissions = useCallback(
    async (id: string, next: boolean) => {
      setPermissionsSavingId(id);
      setErr(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/users/staff-permissions/${encodeURIComponent(id)}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ permissions: next }),
          },
        );
        const data = await parseJson(res);
        if (!res.ok) {
          throw new Error(String(data.message || "Update failed"));
        }
        await loadStaff(page);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Error");
      } finally {
        setPermissionsSavingId(null);
      }
    },
    [loadStaff, page],
  );

  const loadEnquiryData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? enquiryPageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-all-users?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch enquiry data"));
      }
      const list = data.data ?? data.users;
      setEnquiryData(Array.isArray(list) ? (list as EnquiryRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setEnquiryPagination(data.pagination as PaginationInfo);
      } else {
        setEnquiryPagination(null);
      }
      setEnquiryPage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setEnquiryData(null);
      setEnquiryPagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadContactData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? contactPageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-contact-us-data?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch contact data"));
      }
      const list = data.data;
      setContactData(Array.isArray(list) ? (list as ContactRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setContactPagination(data.pagination as PaginationInfo);
      } else {
        setContactPagination(null);
      }
      setContactPage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setContactData(null);
      setContactPagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadBrochureData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? brochurePageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/brachure?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch brochure data"));
      }
      const list = data.data;
      setBrochureData(Array.isArray(list) ? (list as BrochureRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setBrochurePagination(data.pagination as PaginationInfo);
      } else {
        setBrochurePagination(null);
      }
      setBrochurePage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setBrochureData(null);
      setBrochurePagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadCareerData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? careerPageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-carrer-form-data?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch career data"));
      }
      const list = data.data;
      setCareerData(Array.isArray(list) ? (list as CareerRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setCareerPagination(data.pagination as PaginationInfo);
      } else {
        setCareerPagination(null);
      }
      setCareerPage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setCareerData(null);
      setCareerPagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadNriData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? nriPageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-nri-form-data?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch NRI data"));
      }
      const list = data.data;
      setNriData(Array.isArray(list) ? (list as NriRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setNriPagination(data.pagination as PaginationInfo);
      } else {
        setNriPagination(null);
      }
      setNriPage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setNriData(null);
      setNriPagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadFooterEmailData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? footerPageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-footer-email-data?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch footer email data"));
      }
      const list = data.data;
      setFooterData(Array.isArray(list) ? (list as FooterEmailRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setFooterPagination(data.pagination as PaginationInfo);
      } else {
        setFooterPagination(null);
      }
      setFooterPage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setFooterData(null);
      setFooterPagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const loadBlogData = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage ?? blogPageRef.current;
    setErr(null);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(limit),
      });
      const res = await fetch(
        `${API_BASE}/api/users/get-blog-data?${query.toString()}`,
        {
          credentials: "include",
        },
      );
      const data = await parseJson(res);
      if (!res.ok) {
        throw new Error(String(data.message || "Failed to fetch blog data"));
      }
      const list = data.data;
      setBlogData(Array.isArray(list) ? (list as BlogRow[]) : []);
      if (data.pagination && typeof data.pagination === "object") {
        setBlogPagination(data.pagination as PaginationInfo);
      } else {
        setBlogPagination(null);
      }
      setBlogPage(pageToFetch);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setBlogData(null);
      setBlogPagination(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const submitCareerPostData = useCallback(async () => {
    setCareerPostFormErr(null);
    setCareerPostSavedMsg(null);
    const profile = careerPostProfile.trim();
    const description = careerPostDescription.trim();
    if (!profile || !description) {
      setCareerPostFormErr("Profile and description are required.");
      return;
    }
    setCareerPostSubmitting(true);
    try {
      const endpoints = careerPostApiBases().flatMap((base) => [
        `${base}/api/users/send-careerpagejob-data`,
        `${base}/api/users/send-carrerpagejob-data`,
      ]);
      let ok = false;
      let data: Record<string, unknown> | null = null;
      for (const endpoint of endpoints) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile, description }),
          credentials: "include",
        });
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          data = (await res.json()) as Record<string, unknown>;
        } else {
          const text = await res.text();
          data = { message: text || `HTTP ${res.status}` };
        }
        if (res.ok) {
          ok = true;
          break;
        }
      }
      if (!ok) {
        throw new Error(String(data?.message || "Save failed"));
      }
      setCareerPostProfile("");
      setCareerPostDescription("");
      setCareerPostSavedMsg("Saved successfully.");
    } catch (e) {
      setCareerPostFormErr(e instanceof Error ? e.message : "Error");
    } finally {
      setCareerPostSubmitting(false);
    }
  }, [careerPostDescription, careerPostProfile]);

  const submitAddBlog = useCallback(async () => {
    setBlogFormErr(null);
    const title = addTitle.trim();
    const description = addDescription.trim();
    if (!title || !description) {
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
      if (addImageFile) {
        fd.append("image", addImageFile);
      }
      const isEdit = Boolean(editingBlog?._id);
      const endpoint = isEdit
        ? `${API_BASE}/api/users/update-blog-data/${encodeURIComponent(String(editingBlog?._id))}`
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
      setAddImageFile(null);
      setEditingBlog(null);
      setAddBlogOpen(false);
      await loadBlogData();
    } catch (e) {
      setBlogFormErr(e instanceof Error ? e.message : "Error");
    } finally {
      setBlogSubmitting(false);
    }
  }, [addDescription, addImageFile, addTitle, editingBlog, loadBlogData]);

  useEffect(() => {
    if (!addImageFile) {
      setAddImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(addImageFile);
    setAddImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [addImageFile]);

  const deleteBlogPost = useCallback(
    async (id: string) => {
      if (!id) return;
      setDeletingBlogId(id);
      setErr(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/users/delete-blog-data/${encodeURIComponent(id)}`,
          { method: "DELETE", credentials: "include" },
        );
        const data = await parseJson(res);
        if (!res.ok) {
          throw new Error(String(data.message || "Delete failed"));
        }
        const onlyRowOnPage = (blogData?.length ?? 0) === 1;
        await loadBlogData(onlyRowOnPage && blogPage > 1 ? blogPage - 1 : blogPage);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Error");
      } finally {
        setDeletingBlogId(null);
      }
    },
    [blogData?.length, blogPage, loadBlogData],
  );

  const loadSectionData = useCallback(async (section: DataSection | null) => {
    if (!section) {
      setLoading(false);
      setErr(null);
      return;
    }
    if (section === "staff") {
      await loadStaff(section === activeSection ? page : 1);
      return;
    }
    if (section === "enquiry") {
      await loadEnquiryData();
      return;
    }
    if (section === "contact") {
      await loadContactData();
      return;
    }
    if (section === "career") {
      await loadCareerData();
      return;
    }
    if (section === "nri") {
      await loadNriData();
      return;
    }
    if (section === "blog") {
      await loadBlogData();
      return;
    }
    if (section === "footer") {
      await loadFooterEmailData();
      return;
    }
    if (section === "brochure") {
      await loadBrochureData();
      return;
    }
  }, [
    activeSection,
    loadBlogData,
    loadBrochureData,
    loadCareerData,
    loadContactData,
    loadEnquiryData,
    loadFooterEmailData,
    loadNriData,
    loadStaff,
    page,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;

    async function gate() {
      if (sessionStorage.getItem(STAFF_ROLE_KEY) !== "superadmin") {
        setAllowed(false);
        router.replace("/dashboard/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/users/me`, { credentials: "include" });
        const data = await parseJson(res);
        if (!res.ok) {
          sessionStorage.removeItem(STAFF_ROLE_KEY);
          router.replace("/dashboard/login");
          return;
        }
        const role = String((data.user as { role?: string } | undefined)?.role || "")
          .toLowerCase();
        if (role !== "superadmin") {
          sessionStorage.removeItem(STAFF_ROLE_KEY);
          router.replace("/dashboard/login");
          return;
        }
        if (!mounted) return;
        setAllowed(true);
      } catch {
        sessionStorage.removeItem(STAFF_ROLE_KEY);
        router.replace("/dashboard/login");
      }
    }

    void gate();
    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (allowed !== true) return;
    void loadSectionData(activeSection);
  }, [activeSection, allowed, loadSectionData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (allowed !== true) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [allowed]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (allowed !== true) return;
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
  }, [allowed, mobileNavOpen]);

  useEffect(() => {
    if (allowed !== true) return;
    const loadFormOverview = async () => {
      try {
        const [enquiryRes, contactRes, careerRes, nriRes] = await Promise.all([
          fetch(`${API_BASE}/api/users/get-all-users?page=1&limit=1`, {
            credentials: "include",
          }),
          fetch(`${API_BASE}/api/users/get-contact-us-data?page=1&limit=1`, {
            credentials: "include",
          }),
          fetch(`${API_BASE}/api/users/get-carrer-form-data?page=1&limit=1`, {
            credentials: "include",
          }),
          fetch(`${API_BASE}/api/users/get-nri-form-data?page=1&limit=1`, {
            credentials: "include",
          }),
        ]);

        const [enquiryJson, contactJson, careerJson, nriJson] = await Promise.all([
          parseJson(enquiryRes),
          parseJson(contactRes),
          parseJson(careerRes),
          parseJson(nriRes),
        ]);

        setFormOverview({
          enquiry: totalItemsFromApi(enquiryJson),
          contact: totalItemsFromApi(contactJson),
          career: totalItemsFromApi(careerJson),
          nri: totalItemsFromApi(nriJson),
        });
      } catch {
        setFormOverview({ enquiry: 0, contact: 0, career: 0, nri: 0 });
      }
    };

    void loadFormOverview();
  }, [allowed]);

  if (allowed !== true) {
    return (
      <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900">
        <p className="mx-auto max-w-md text-sm text-zinc-600">
          {allowed === false
            ? "Redirecting to sign in…"
            : "Checking session…"}
        </p>
      </main>
    );
  }

  const safeStaff = staff ?? [];
  const totalStaff = summary?.totalStaff ?? 0;
  const totalAdmin = summary?.totalAdmin ?? 0;
  const totalEditor = summary?.totalEditor ?? 0;
  const totalAccess = summary?.totalAccess ?? 0;
  const formGraphData = [
    { label: "Enquiry", value: formOverview.enquiry, color: "from-sky-500 to-blue-600" },
    { label: "Contact", value: formOverview.contact, color: "from-teal-500 to-emerald-600" },
    { label: "Career", value: formOverview.career, color: "from-violet-500 to-purple-600" },
    { label: "NRI", value: formOverview.nri, color: "from-amber-500 to-orange-600" },
  ];
  const formGraphMax = Math.max(...formGraphData.map((item) => item.value), 1);
  const roleTotal = totalAdmin + totalEditor;
  const adminSliceDeg =
    roleTotal > 0 ? (totalAdmin / roleTotal) * 360 : 180;
  const pieBackground =
    roleTotal > 0
      ? `conic-gradient(#4f46e5 0deg ${adminSliceDeg}deg, #0e7490 ${adminSliceDeg}deg 360deg)`
      : "conic-gradient(#cbd5e1 0deg 360deg)";

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
          aria-controls="superadmin-mobile-nav"
          onClick={() => setMobileNavOpen(true)}
          className="fixed left-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-lg transition hover:bg-zinc-50 lg:hidden"
        >
          <i className="ri-menu-3-line text-2xl leading-none" aria-hidden />
        </button>
      ) : null}

      <div className="grid h-screen grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside
          id="superadmin-mobile-nav"
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
                  {/* <p className="text-[11px] uppercase tracking-[0.2em] text-white/65">
                    Product Design Board
                  </p> */}
                  <p className="mt-1  text-lg font-semibold text-white">SuperAdmin Panel</p>
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
              {sectionMeta.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.key);
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
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(STAFF_ROLE_KEY);
                router.push("/dashboard/login");
              }}
              className="mt-auto w-full cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </aside>

        <section className="h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="md:text-4xl text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent max-lg:ml-[40px]">
              SuperAdmin Dashboard
            </h1>
            {/* <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(STAFF_ROLE_KEY);
                router.push("/dashboard/login");
              }}
              className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-100"
            >
              Sign out
            </button> */}
          </header>

          <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-white/30 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Total Staff
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                {totalStaff}
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700/80">
                Total Admin
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-950">
                {totalAdmin}
              </p>
            </article>
            <article className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700/80">
                Total Editor
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-950">
                {totalEditor}
              </p>
            </article>
            <article className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/80">
                Total Access
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-950">
                {totalAccess}
              </p>
            </article>
          </section>

          {activeSection === "staff" ? (
          <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/50 p-4 shadow-md ring-1 ring-amber-100/60">
              <div className="mb-3 border-b border-amber-200/60 pb-2">
                <h2 className="text-base font-bold tracking-tight text-amber-950">
                  Form submissions
                </h2>
                <p className="text-xs text-amber-900/70">
                  Enquiry, Contact, Career and NRI (live counts)
                </p>
              </div>
              <div className="flex min-h-[200px] items-end justify-between gap-2 overflow-x-auto rounded-xl border border-amber-200/50 bg-white/70 p-3">
                {formGraphData.map((item) => {
                  const barHeight = Math.max((item.value / formGraphMax) * 150, 8);
                  return (
                    <div key={item.label} className="min-w-[72px] text-center">
                      <p className="mb-1.5 text-sm font-bold text-zinc-800">{item.value}</p>
                      <div className="mx-auto flex h-[160px] w-10 items-end rounded-lg bg-amber-100/80 p-1">
                        <div
                          className={`w-full rounded-md bg-gradient-to-b ${item.color} shadow-md transition-all duration-700`}
                          style={{ height: `${barHeight}px` }}
                          title={`${item.label}: ${item.value}`}
                        />
                      </div>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 via-white to-cyan-50/80 p-4 shadow-md ring-1 ring-indigo-100/60">
              <div className="mb-3 border-b border-indigo-200/50 pb-2">
                <h2 className="text-base font-bold tracking-tight text-indigo-950">
                  Staff roles
                </h2>
                <p className="text-xs text-indigo-900/70">Admin vs Editor distribution</p>
              </div>
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 sm:flex-row sm:justify-around">
                <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
                  <div
                    className="absolute h-full w-full rounded-full shadow-inner ring-2 ring-white/80"
                    style={{ background: pieBackground }}
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-[52%] w-[52%] flex-col items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Total
                    </p>
                    <p className="text-xl font-bold text-zinc-900">{roleTotal || "—"}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-3 w-3 shrink-0 rounded-sm bg-indigo-600" />
                    <span className="font-medium text-zinc-800">Admin</span>
                    <span className="text-zinc-600">
                      {totalAdmin}
                      {roleTotal > 0 ? (
                        <span className="text-zinc-400">
                          {" "}
                          ({Math.round((totalAdmin / roleTotal) * 100)}%)
                        </span>
                      ) : null}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-3 w-3 shrink-0 rounded-sm bg-cyan-700" />
                    <span className="font-medium text-zinc-800">Editor</span>
                    <span className="text-zinc-600">
                      {totalEditor}
                      {roleTotal > 0 ? (
                        <span className="text-zinc-400">
                          {" "}
                          ({Math.round((totalEditor / roleTotal) * 100)}%)
                        </span>
                      ) : null}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          ) : null}

          <div
            key={activeSection ?? "none"}
            className="rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-orange-50/90 p-5 shadow-[0_0_0_1px_rgba(251,191,36,0.25),0_12px_40px_-12px_rgba(180,83,9,0.25)] ring-1 ring-amber-200/70 transition-all duration-300 sm:p-6"
          >
          {!activeSection ? (
            <div className="rounded-xl border border-amber-300/70 bg-white/80 p-8 text-center">
              <h3 className="text-lg font-semibold text-amber-950">
                Select a section from the left sidebar
              </h3>
              <p className="mt-2 text-sm text-amber-900/80">
                Use the full-screen menu to open Staff, Enquiry, Contact, Career, NRI, Blog,
                Footer Enquire, or Download Brochure data.
              </p>
            </div>
          ) : (
            <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                id="staff-highlight-heading"
                className="text-lg font-bold tracking-tight text-amber-950"
              >
                  {sectionMeta.find((s) => s.key === activeSection)?.label}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activeSection === "blog" ? (
                <button
                  type="button"
                  onClick={() => {
                    setBlogFormErr(null);
                    setEditingBlog(null);
                    setAddTitle("");
                    setAddDescription("");
                    setAddImageFile(null);
                    setAddBlogOpen(true);
                  }}
                  disabled={loading}
                  className="shrink-0 cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
                >
                  Add blog
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void loadSectionData(activeSection)}
                disabled={loading}
                className="shrink-0 cursor-pointer rounded-lg border-2 border-amber-600 bg-white px-3 py-2 text-sm font-semibold text-amber-950 shadow-sm hover:bg-amber-100 disabled:opacity-50"
              >
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm font-medium text-amber-900/80">Loading…</p>
          ) : null}
          {err ? (
            <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900">
              {err}
            </p>
          ) : null}
          {activeSection === "staff" && !loading && staff && staff.length === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No staff users found yet.
            </p>
          ) : null}
          {activeSection === "staff" && !loading && staff && staff.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Role</th>
                      <th className="px-3 py-2 font-semibold">Permissions</th>
                      <th className="px-3 py-2 font-semibold">Created</th>
                      <th className="px-3 py-2 font-semibold">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {row.name ?? "—"}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {row.email ?? "—"}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          <span className="rounded-md bg-amber-200/80 px-2 py-0.5 text-xs font-semibold uppercase text-amber-950">
                            {row.role ?? "—"}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {row.role === "superadmin" ? (
                            <span className="text-xs text-zinc-500">—</span>
                          ) : (
                            <button
                              type="button"
                              role="switch"
                              aria-checked={row.permissions === true}
                              disabled={
                                loading ||
                                !row._id ||
                                permissionsSavingId === String(row._id)
                              }
                              onClick={() =>
                                void updateUserPermissions(
                                  String(row._id),
                                  !Boolean(row.permissions),
                                )
                              }
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                                row.permissions ? "bg-emerald-500" : "bg-zinc-300"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition ${
                                  row.permissions
                                    ? "translate-x-[1.35rem]"
                                    : "translate-x-0.5"
                                }`}
                              />
                            </button>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs text-zinc-600">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleString()
                            : "—"}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            disabled={
                              loading ||
                              !row._id ||
                              deletingId === String(row._id)
                            }
                            onClick={() => void deleteStaffUser(String(row._id))}
                            className="cursor-pointer rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-100 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {pagination.page} of {pagination.totalPages} · Total{" "}
                    {pagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!pagination.hasPrevPage || loading}
                      onClick={() => void loadStaff(page - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!pagination.hasNextPage || loading}
                      onClick={() => void loadStaff(page + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "enquiry" &&
          !loading &&
          enquiryPagination &&
          enquiryPagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No enquiry form submissions found.
            </p>
          ) : null}
          {activeSection === "enquiry" &&
          !loading &&
          enquiryData &&
          enquiryData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Full Name</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Mobile</th>
                      <th className="px-3 py-2 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiryData.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {[row.firstName, row.lastName].filter(Boolean).join(" ") || "—"}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">{row.email ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.mobile ?? "—"}</td>
                        <td className="min-w-[200px] px-3 py-2 text-xs text-zinc-600">
                          {formatSubmittedAtDisplay(row)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {enquiryPagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {enquiryPagination.page} of {enquiryPagination.totalPages} · Total{" "}
                    {enquiryPagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!enquiryPagination.hasPrevPage || loading}
                      onClick={() => void loadEnquiryData(enquiryPage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!enquiryPagination.hasNextPage || loading}
                      onClick={() => void loadEnquiryData(enquiryPage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "contact" &&
          !loading &&
          contactPagination &&
          contactPagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No contact form submissions found.
            </p>
          ) : null}
          {activeSection === "contact" &&
          !loading &&
          contactData &&
          contactData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[880px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Mobile</th>
                      <th className="px-3 py-2 font-semibold">Message</th>
                      <th className="px-3 py-2 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactData.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">{row.name ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.email ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.mobile ?? "—"}</td>
                        <td className="max-w-[320px] truncate px-3 py-2 text-zinc-800">
                          {row.message ?? "—"}
                        </td>
                        <td className="min-w-[200px] px-3 py-2 text-xs text-zinc-600">
                          {formatSubmittedAtDisplay(row)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {contactPagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {contactPagination.page} of {contactPagination.totalPages} · Total{" "}
                    {contactPagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!contactPagination.hasPrevPage || loading}
                      onClick={() => void loadContactData(contactPage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!contactPagination.hasNextPage || loading}
                      onClick={() => void loadContactData(contactPage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "brochure" &&
          !loading &&
          brochurePagination &&
          brochurePagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No brochure download submissions found.
            </p>
          ) : null}
          {activeSection === "brochure" &&
          !loading &&
          brochureData &&
          brochureData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Mobile</th>
                      <th className="px-3 py-2 font-semibold">Project</th>
                      <th className="px-3 py-2 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brochureData.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">{row.name ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.email ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.mobile ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.project ?? "—"}</td>
                        <td className="min-w-[200px] px-3 py-2 text-xs text-zinc-600">
                          {formatSubmittedAtDisplay(row)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {brochurePagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {brochurePagination.page} of {brochurePagination.totalPages} · Total{" "}
                    {brochurePagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!brochurePagination.hasPrevPage || loading}
                      onClick={() => void loadBrochureData(brochurePage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!brochurePagination.hasNextPage || loading}
                      onClick={() => void loadBrochureData(brochurePage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "career" &&
          !loading &&
          careerPagination &&
          careerPagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No career form submissions found.
            </p>
          ) : null}
          {activeSection === "career" &&
          !loading &&
          careerData &&
          careerData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[1100px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Mobile</th>
                      <th className="px-3 py-2 font-semibold">Designation</th>
                      <th className="min-w-[200px] max-w-[320px] px-3 py-2 font-semibold">Message</th>
                      <th className="px-3 py-2 font-semibold">Resume</th>
                      <th className="px-3 py-2 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerData.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">{row.name ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.email ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.mobile ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.designation ?? "—"}</td>
                        <td className="min-w-[200px] max-w-[320px] px-3 py-2 align-top text-xs text-zinc-800">
                          <span className="line-clamp-4 whitespace-pre-wrap break-words" title={row.message}>
                            {row.message?.trim() ? row.message : "—"}
                          </span>
                        </td>
                        <td className="max-w-[280px] px-3 py-2 text-zinc-800">
                          <div className="flex items-center gap-2">
                            <span className="min-w-0 truncate">{row.resume ?? "—"}</span>
                            {row.resume ? (
                              <button
                                type="button"
                                onClick={() => void downloadCareerResumeFromPath(row.resume)}
                                className="cursor-pointer shrink-0 rounded-md border border-amber-300 bg-white px-2 py-1 text-xs font-semibold hover:bg-amber-50"
                              >
                                Download
                              </button>
                            ) : null}
                          </div>
                        </td>
                        <td className="min-w-[200px] px-3 py-2 text-xs text-zinc-600">
                          {formatSubmittedAtDisplay(row)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {careerPagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {careerPagination.page} of {careerPagination.totalPages} · Total{" "}
                    {careerPagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!careerPagination.hasPrevPage || loading}
                      onClick={() => void loadCareerData(careerPage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!careerPagination.hasNextPage || loading}
                      onClick={() => void loadCareerData(careerPage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "careerpost" && !loading ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-300/80 bg-white p-4">
                <p className="text-sm font-semibold text-amber-950">Post career data</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700" htmlFor="careerpost-profile">
                      Profile
                    </label>
                    <input
                      id="careerpost-profile"
                      type="text"
                      value={careerPostProfile}
                      onChange={(e) => setCareerPostProfile(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700" htmlFor="careerpost-description">
                      Description
                    </label>
                    <textarea
                      id="careerpost-description"
                      value={careerPostDescription}
                      onChange={(e) => setCareerPostDescription(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                  {careerPostFormErr ? (
                    <p className="rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs text-red-800">
                      {careerPostFormErr}
                    </p>
                  ) : null}
                  {careerPostSavedMsg ? (
                    <p className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-xs text-emerald-800">
                      {careerPostSavedMsg}
                    </p>
                  ) : null}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={careerPostSubmitting}
                      onClick={() => void submitCareerPostData()}
                      className="cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {careerPostSubmitting ? "Saving..." : "Save post"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {activeSection === "nri" &&
          !loading &&
          nriPagination &&
          nriPagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No NRI form submissions found.
            </p>
          ) : null}
          {activeSection === "nri" && !loading && nriData && nriData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[880px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Mobile</th>
                      <th className="px-3 py-2 font-semibold">Message</th>
                      <th className="px-3 py-2 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nriData.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">{row.name ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.email ?? "—"}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.mobile ?? "—"}</td>
                        <td className="max-w-[320px] truncate px-3 py-2 text-zinc-800">
                          {row.message ?? "—"}
                        </td>
                        <td className="min-w-[200px] px-3 py-2 text-xs text-zinc-600">
                          {formatSubmittedAtDisplay(row)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {nriPagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {nriPagination.page} of {nriPagination.totalPages} · Total{" "}
                    {nriPagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!nriPagination.hasPrevPage || loading}
                      onClick={() => void loadNriData(nriPage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!nriPagination.hasNextPage || loading}
                      onClick={() => void loadNriData(nriPage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "blog" &&
          !loading &&
          blogPagination &&
          blogPagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">No blog posts yet. Use Add blog.</p>
          ) : null}
          {activeSection === "blog" && !loading && blogData && blogData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Title</th>
                      <th className="px-3 py-2 font-semibold">Description</th>
                      <th className="px-3 py-2 font-semibold">Image</th>
                      <th className="px-3 py-2 font-semibold">Date</th>
                      <th className="px-3 py-2 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogData.map((row) => {
                      const imgSrc =
                        row.image && typeof row.image === "string"
                          ? `${API_BASE}/${row.image.replace(/^\/+/, "")}`
                          : "";
                      return (
                        <tr
                          key={String(row._id ?? row.title)}
                          className="border-b border-amber-100/80 last:border-0"
                        >
                          <td className="px-3 py-2 font-medium text-zinc-900">
                            {blogTwoWordPreview(row.title)}
                          </td>
                          <td className="max-w-[280px] px-3 py-2 text-zinc-800">
                            {blogTwoWordPreview(row.description)}
                          </td>
                          <td className="px-3 py-2">
                            {imgSrc ? (
                              <a
                                href={imgSrc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block cursor-pointer"
                              >
                                <img
                                  src={imgSrc}
                                  alt=""
                                  className="h-12 w-16 rounded border border-amber-200 object-cover"
                                />
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="min-w-[160px] px-3 py-2 text-xs text-zinc-600">
                            {formatSubmittedAtDisplay(row)}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => setPreviewBlog(row)}
                                aria-label="Preview blog"
                                title="Preview"
                                className="cursor-pointer rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-emerald-700 hover:bg-emerald-100"
                              >
                                <i className="ri-eye-line text-[16px]" aria-hidden />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingBlog(row);
                                  setAddTitle(String(row.title ?? ""));
                                  setAddDescription(String(row.description ?? ""));
                                  setAddImageFile(null);
                                  setBlogFormErr(null);
                                  setAddBlogOpen(true);
                                }}
                                aria-label="Edit blog"
                                title="Edit"
                                className="cursor-pointer rounded-md border border-zinc-300 bg-zinc-100 px-2 py-1 text-zinc-700 hover:bg-zinc-200"
                              >
                                <i className="ri-pencil-line text-[16px]" aria-hidden />
                              </button>
                              <button
                                type="button"
                                disabled={loading || !row._id || deletingBlogId === String(row._id)}
                                onClick={() => void deleteBlogPost(String(row._id))}
                                aria-label="Delete blog"
                                title="Delete"
                                className="cursor-pointer rounded-md border border-red-300 bg-red-50 px-2 py-1 text-red-700 hover:bg-red-100 disabled:opacity-50"
                              >
                                <i className="ri-delete-bin-line text-[16px]" aria-hidden />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {blogPagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {blogPagination.page} of {blogPagination.totalPages} · Total{" "}
                    {blogPagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!blogPagination.hasPrevPage || loading}
                      onClick={() => void loadBlogData(blogPage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!blogPagination.hasNextPage || loading}
                      onClick={() => void loadBlogData(blogPage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeSection === "footer" &&
          !loading &&
          footerPagination &&
          footerPagination.totalItems === 0 ? (
            <p className="text-sm font-medium text-amber-900/80">
              No footer email subscriptions found.
            </p>
          ) : null}
          {activeSection === "footer" &&
          !loading &&
          footerData &&
          footerData.length > 0 ? (
            <div>
              <div className="overflow-x-auto rounded-xl border border-amber-300/80 bg-white/95 shadow-inner">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="border-b border-amber-200 bg-amber-100/90 text-amber-950">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {footerData.map((row) => (
                      <tr
                        key={String(row._id ?? row.email)}
                        className="border-b border-amber-100/80 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {row.email ?? "—"}
                        </td>
                        <td className="min-w-[200px] px-3 py-2 text-xs text-zinc-600">
                          {formatSubmittedAtDisplay(row)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {footerPagination ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-2 text-sm text-amber-950">
                  <p className="text-xs font-medium">
                    Page {footerPagination.page} of {footerPagination.totalPages} · Total{" "}
                    {footerPagination.totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!footerPagination.hasPrevPage || loading}
                      onClick={() => void loadFooterEmailData(footerPage - 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={!footerPagination.hasNextPage || loading}
                      onClick={() => void loadFooterEmailData(footerPage + 1)}
                      className="cursor-pointer rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          </>
          )}
          </div>

          {addBlogOpen ? (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-blog-title"
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-200 bg-white p-6 shadow-xl"
              >
                <h3 id="add-blog-title" className="text-lg font-bold text-amber-950">
                  {editingBlog ? "Edit blog" : "Add blog"}
                </h3>
                <p className="mt-1 text-xs text-zinc-600">
                  {editingBlog ? (
                    <>
                      Updates via{" "}
                      <span className="font-mono">PUT /api/users/update-blog-data/:id</span>
                    </>
                  ) : (
                    <>
                      Posts to <span className="font-mono">POST /api/users/send-blog-data</span>{" "}
                      (multipart).
                    </>
                  )}
                </p>
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
                    <label
                      className="block text-xs font-semibold text-zinc-700"
                      htmlFor="add-blog-description"
                    >
                      Description
                    </label>
                    <textarea
                      id="add-blog-description"
                      value={addDescription}
                      onChange={(e) => setAddDescription(e.target.value)}
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
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
                      setAddImageFile(null);
                      setEditingBlog(null);
                    }}
                    className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={blogSubmitting}
                    onClick={() => void submitAddBlog()}
                    className="cursor-pointer rounded-lg border-2 border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {blogSubmitting ? "Saving…" : editingBlog ? "Save changes" : "Save blog"}
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
                    {previewBlog.title ?? "Blog preview"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPreviewBlog(null)}
                    className="cursor-pointer rounded-lg border border-zinc-300 px-2 py-1 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    Close
                  </button>
                </div>
                {previewBlog.description?.trim() ? (
                  <div
                    className="mt-3 text-sm text-zinc-800 [&_a]:text-blue-600 [&_a]:underline [&_img]:max-h-[40vh] [&_img]:max-w-full [&_p]:mb-2 [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: previewBlog.description }}
                  />
                ) : (
                  <p className="mt-3 text-sm text-zinc-400">—</p>
                )}
                {previewBlog.image && typeof previewBlog.image === "string" ? (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-zinc-600">Image</p>
                    <img
                      src={`${API_BASE}/${previewBlog.image.replace(/^\/+/, "")}`}
                      alt=""
                      className="mt-2 max-h-[50vh] w-full rounded-lg border border-amber-200 object-contain"
                    />
                  </div>
                ) : null}
                <p className="mt-3 text-xs text-zinc-500">
                  {formatSubmittedAtDisplay(previewBlog)}
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
