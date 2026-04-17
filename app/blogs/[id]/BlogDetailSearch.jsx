"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { API_BASE, blogImageUrlFromApi, parseJson } from "../../dashboard/lib";

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

export default function BlogDetailSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [titleCatalog, setTitleCatalog] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function loadTitles() {
      try {
        const q = new URLSearchParams({ page: "1", limit: "200" });
        const res = await fetch(`${API_BASE}/api/users/get-blog-data?${q}`);
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

  const q = searchTerm.trim().toLowerCase();
  const matches = q
    ? titleCatalog.filter((b) => b.title.toLowerCase().includes(q)).slice(0, 20)
    : [];

  return (
    <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:p-4">
      <label htmlFor="blog-detail-search" className="sr-only">
        Search blog
      </label>
      <div className="relative">
        <input
          id="blog-detail-search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-full border-0 bg-[#F7F7F7] py-3 pl-4 pr-11 font-quattrocento text-sm text-[#111111] placeholder:text-[#111111]/70 outline-none ring-0 focus:ring-2 focus:ring-[#111111]/15"
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
          {matches.length === 0 ? (
            <li className="font-lato text-xs text-[#666666]">No blogs found.</li>
          ) : (
            matches.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/blogs/${b.id}`}
                  className="flex gap-3 rounded-md px-1 py-1.5 min-[420px]:gap-4 hover:bg-[#F7F7F7]"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[5px] sm:h-16 sm:w-16">
                    <Image
                      key={`search-${b.id}-${b.image}`}
                      src={b.image}
                      alt={b.title || "Blog"}
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
  );
}
