"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  API_BASE,
  blogImageUrlFromApi,
  parseJson,
  stripHtmlToPlainText,
} from "../../dashboard/lib";

const EXCERPT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo Ut enim ad minim veniam";

/** First `maxWords` words, then "..."; `emptyFallback` when there is no text. */
function wordPreview(text, maxWords, emptyFallback = "—") {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return emptyFallback;
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

const LIMIT = 2;

function formatBlogDate(value) {
  const d = new Date(String(value ?? ""));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function BlogListing() {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [titleCatalog, setTitleCatalog] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadBlogs(targetPage) {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({
          page: String(targetPage),
          limit: String(LIMIT),
        });
        const res = await fetch(`${API_BASE}/api/users/get-blog-data?${query.toString()}`);
        const data = await parseJson(res);
        if (!res.ok) {
          throw new Error(String(data.message || "Failed to fetch blog data"));
        }
        if (!mounted) return;
        const list = Array.isArray(data.data) ? data.data : [];
        setPosts(
          list.map((item, idx) => ({
            id: String(item._id ?? idx),
            title: String(item.title ?? "Untitled"),
            author: "admin",
            date: formatBlogDate(item.uploadDate ?? item.createdAt),
            excerpt: stripHtmlToPlainText(item.description) || EXCERPT,
            image:
              item.image && typeof item.image === "string"
                ? `${API_BASE}/${item.image.replace(/^\/+/, "")}`
                : "/assets/section-2image.jpg",
          })),
        );
        const p = data.pagination && typeof data.pagination === "object" ? data.pagination : null;
        setPage(Number(p?.page || targetPage || 1));
        setTotalPages(Math.max(1, Number(p?.totalPages || 1)));
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load blogs");
        setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void loadBlogs(page);
    return () => {
      mounted = false;
    };
  }, [page]);

  useEffect(() => {
    let mounted = true;
    async function loadRecentBlogs() {
      try {
        const res = await fetch(`${API_BASE}/api/users/recent-blogs`);
        const data = await parseJson(res);
        if (!res.ok) {
          throw new Error(String(data.message || "Failed to fetch recent blogs"));
        }
        if (!mounted) return;
        const list = Array.isArray(data.data) ? data.data : [];
        setRecentPosts(
          list.map((item, idx) => ({
            id: String(item._id ?? `recent-${idx}`),
            title: String(item.title ?? "Untitled"),
            date: formatBlogDate(item.uploadDate ?? item.createdAt),
            excerpt: stripHtmlToPlainText(item.description),
            image:
              item.image && typeof item.image === "string"
                ? `${API_BASE}/${item.image.replace(/^\/+/, "")}`
                : "/assets/recentpost2.jpg",
          })),
        );
      } catch {
        if (!mounted) return;
        setRecentPosts([]);
      }
    }
    void loadRecentBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadTitles() {
      try {
        const query = new URLSearchParams({ page: "1", limit: "200" });
        const res = await fetch(`${API_BASE}/api/users/get-blog-data?${query.toString()}`);
        const data = await parseJson(res);
        if (!mounted || !res.ok) return;
        const list = Array.isArray(data.data) ? data.data : [];
        setTitleCatalog(
          list.map((item, idx) => ({
            id: item?._id != null ? String(item._id) : String(idx),
            title: String(item.title ?? "Untitled"),
            image: blogImageUrlFromApi(item?.image),
          })),
        );
      } catch {
        if (mounted) setTitleCatalog([]);
      }
    }
    void loadTitles();
    return () => {
      mounted = false;
    };
  }, []);

  const searchQuery = searchTerm.trim().toLowerCase();
  const searchMatches = searchQuery
    ? titleCatalog.filter((b) => b.title.toLowerCase().includes(searchQuery)).slice(0, 20)
    : [];

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-[72px] xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 space-y-14 sm:space-y-16 lg:space-y-[4.5rem]">
            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 font-lato text-sm text-red-800">
                {error}
              </p>
            ) : null}
            {loading ? (
              <p className="font-lato text-sm text-[#00000099]">Loading blogs...</p>
            ) : null}
            {!loading && !error && posts.length === 0 ? (
              <p className="font-lato text-sm text-[#00000099]">No blogs found.</p>
            ) : null}
            {posts.map((post) => (
              <article key={post.id} className="min-w-0">
                <div className="relative isolate overflow-hidden [transform:translateZ(0)]">
                  <div className="block overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`Blog cover: ${post.title || "Sanskar Realty article"}`}
                      title={post.title || "Sanskar Realty blog article"}
                      width={900}
                      height={506}
                      className="h-[450px] w-full object-cover"
                    />
                  </div>
                  <Link
                    href={`/blogs/${post.id}`}
                    aria-label={`View ${post.title} blog`}
                    className="group absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-[#111111] transition-transform hover:scale-105 sm:right-6 sm:top-6 sm:h-11 sm:w-11 md:right-8 md:top-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[200%] group-hover:-translate-y-[200%]"
                      aria-hidden
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute -translate-x-[200%] translate-y-[200%] transition-transform duration-[400ms] ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
                      aria-hidden
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                </div>
                <h2 className="font-quattrocento mt-6 text-[24px] font-normal leading-normal md:leading-[100%] tracking-normal text-[#000000] sm:mt-7">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="text-inherit underline-offset-4 "
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 font-lato text-[16px] font-normal leading-[19px] tracking-normal text-[#00000099]">
                  By{" "}
                  <span className="font-semibold">
                    {post.author}
                  </span>
                  , {post.date}
                </p>
                <div
                  className="mt-3 h-px w-full bg-[#D5D5D5]"
                  aria-hidden
                />
                <p className="mt-4 font-lato text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]">
                  {wordPreview(post.excerpt, 30)}
                </p>
                <Link
                  href={`/blogs/${post.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 font-lato text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]"
                >
                  <span className="leading-[24px]">Read more</span>
                  <span className="inline-flex shrink-0 items-center leading-none">
                    <Image
                      src="/assets/arrow.svg"
                      alt="Arrow icon"
                      title="Read more"
                      width={20}
                      height={13}
                      className="block h-[13px] w-5 object-contain"
                      aria-hidden
                    />
                  </span>
                </Link>
              </article>
            ))}

            <nav
              className="-mt-6 flex flex-wrap items-center gap-2 sm:-mt-8 sm:gap-2.5"
              aria-label="Blog list pagination"
            >
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Previous page"
              >
                <Image
                  src="/assets/leftarrow.svg"
                  alt="Previous page"
                  title="Previous page"
                  width={8}
                  height={12}
                  className="block object-contain"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#F5AC00] bg-white font-lato text-[14px] font-normal leading-none text-[#F5AC00]"
                aria-current="page"
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
              <span className="font-lato text-[14px] text-[#666666]">/ {totalPages}</span>
              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Next page"
              >
                <Image
                  src="/assets/rightarrrow.svg"
                  alt="Next page"
                  title="Next page"
                  width={8}
                  height={12}
                  className="block object-contain"
                  aria-hidden
                />
              </button>
            </nav>
          </div>

          <aside className="min-w-0 space-y-8 lg:space-y-7">
            <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:p-4">
              <label htmlFor="blog-search" className="sr-only">
                Search blog
              </label>
              <div className="relative">
                <input
                  id="blog-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-full border-0 bg-[#F7F7F7] py-3 pl-4 pr-11 font-quattrocento text-[14px] font-normal leading-[100%] tracking-normal text-[#111111] placeholder:font-quattrocento placeholder:text-[14px] placeholder:font-normal placeholder:leading-[100%] placeholder:tracking-normal placeholder:text-[#111111] outline-none ring-0 focus:ring-2 focus:ring-[#111111]/15 sm:py-3.5"
                />
                <span
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#111111]"
                  aria-hidden
                >
                  <SearchIcon className="h-[18px] w-[18px]" />
                </span>
              </div>
              {searchTerm.trim() ? (
                <ul
                  className="mt-3 max-h-72 overflow-y-auto border-t border-[#EEEEEE] pt-3"
                  role="listbox"
                  aria-label="Search results"
                >
                  {searchMatches.length === 0 ? (
                    <li className="font-lato text-xs text-[#666666]">No blogs found.</li>
                  ) : (
                    searchMatches.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={`/blogs/${b.id}`}
                          className="flex gap-3 rounded-md px-1 py-1.5 min-[420px]:gap-4 hover:bg-[#F7F7F7]"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[5px] sm:h-16 sm:w-16">
                            <Image
                              key={`search-${b.id}-${b.image}`}
                              src={b.image}
                              alt={`Thumbnail: ${b.title || "Blog post"}`}
                              title={b.title || "Blog post"}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <span className="line-clamp-2 min-w-0 flex-1 pt-0.5 font-quattrocento text-sm font-semibold leading-snug text-[#111111]">
                            {b.title}
                          </span>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              ) : null}
            </div>

            <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:px-4 sm:py-6">
              <h3 className="border-b border-[#D5D5D5] pb-5 font-quattrocento text-[18px] font-normal leading-[100%] tracking-normal text-[#111111]">
                Recent Posts
              </h3>
              <ul className="mt-5 space-y-5">
                {recentPosts.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={`/blogs/${item.id}`}
                      className="flex gap-3 min-[420px]:gap-4 hover:opacity-90"
                    >
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[5px] sm:h-[80px] sm:w-[80px]">
                        <Image
                          src={item.image || "/assets/recentpost2.jpg"}
                          alt={`Recent post: ${item.title || "Sanskar Realty blog"}`}
                          title={item.title || "Recent blog post"}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="line-clamp-2 break-words font-quattrocento text-[15px] font-semibold leading-[19px] tracking-normal text-[#111111]">
                          {wordPreview(item.title, 4, "Untitled")}
                        </p>
                        <p className="mt-1 line-clamp-3 break-words font-lato text-[14px] font-normal leading-[19px] tracking-normal text-[#111111]">
                          {wordPreview(stripHtmlToPlainText(item.excerpt), 10)}
                        </p>
                        <p className="mt-1.5 font-quattrocento text-[14px] font-normal leading-[19px] tracking-normal text-[#00000099]">
                          {item.date || "—"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:p-6">
              <h3 className="border-b border-[#D5D5D5] pb-3 font-quattrocento text-[18px] font-normal text-[#111111] sm:text-[20px]">
                Latest Property
              </h3>
              <div className="relative mt-4 overflow-hidden">
                <span className="absolute left-3 top-3 z-[1] inline-flex items-center justify-center rounded-full bg-black px-3 py-1.5 text-center align-middle font-lato text-[8px] font-bold leading-[100%] tracking-normal text-[#F7F3FF] sm:left-4 sm:top-4">
                  Latest Property
                </span>
                <Image
                  src="/assets/latest-property-image.jpg"
                  alt="Latest Sanskar Realty property — premium residential development"
                  title="Latest Sanskar Realty property"
                  width={340}
                  height={220}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 340px, 100vw"
                />
              </div>
            </div>
          </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
