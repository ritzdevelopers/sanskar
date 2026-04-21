import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { HeroPageHeader } from "../../components/common/HeroPageHeader";
import { FooterSection } from "../../components/home/FooterSection";
import { API_BASE, stripHtmlToPlainText } from "../../dashboard/lib";

import BlogDetailHeroImage from "./BlogDetailHeroImage";
import BlogDetailSearch from "./BlogDetailSearch";

function formatBlogDate(value) {
  const d = new Date(String(value ?? ""));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function shortHeading(text, max = 35) {
  const t = String(text ?? "").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, 32).trim()}...`;
}

function wordPreview(text, maxWords) {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "—";
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

async function fetchBlogPayload(id) {
  const res = await fetch(`${API_BASE}/api/users/blog/${id}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchRecentBlogs() {
  const res = await fetch(`${API_BASE}/api/users/recent-blogs`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const json = await fetchBlogPayload(id);
  if (!json?.data) {
    return { title: "Blog | Sanskar Realty" };
  }
  const title = String(json.data.title || "Blog");
  const metaDesc = String(json.data.metaDescription || "").trim();
  const desc =
    metaDesc ||
    stripHtmlToPlainText(json.data.description).slice(0, 160);
  const kw = String(json.data.metaKeywords || "").trim();
  return {
    title: `${title} | Blog`,
    description: desc || undefined,
    ...(kw
      ? {
          keywords: kw
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }
      : {}),
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const [json, recentBlogsRaw] = await Promise.all([fetchBlogPayload(id), fetchRecentBlogs()]);
  if (!json?.data) {
    redirect("/blogs");
  }

  const blog = json.data;
  const prev = json.prev;
  const next = json.next;

  const imageUrl =
    blog.image && typeof blog.image === "string"
      ? `${API_BASE}/${String(blog.image).replace(/^\/+/, "")}`
      : "/assets/section-2image.jpg";

  const title = String(blog.title || "Blog");
  const body = String(blog.description || "");
  const dateLine = formatBlogDate(blog.uploadDate ?? blog.createdAt);
  const recentBlogs = recentBlogsRaw
    .map((item, idx) => ({
      id: String(item?._id ?? `recent-${idx}`),
      title: String(item?.title ?? "Untitled"),
      excerpt: stripHtmlToPlainText(item?.description ?? ""),
      image:
        item?.image && typeof item.image === "string"
          ? `${API_BASE}/${String(item.image).replace(/^\/+/, "")}`
          : "/assets/recentpost2.jpg",
    }))
    .slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[min(100dvh,520px)] w-full items-end justify-center overflow-hidden sm:min-h-[560px] md:min-h-[360px] lg:min-h-[480px] xl:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/blogmobilebanner.jpg"
            alt=""
            fill
            priority
            quality={60}
            className="object-cover md:hidden"
            sizes="100vw"
          />
          <Image
            src="/assets/blogdeskatopbanner.jpg"
            alt=""
            fill
            priority
            quality={60}
            className="hidden object-cover md:block"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <HeroPageHeader contactPageStyle />

        <div className="relative z-10 w-full px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 md:px-8 md:pb-12 md:pt-16 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
            <nav
              className="font-lato text-[13px] font-normal leading-relaxed text-white/90 sm:text-sm"
              aria-label="Breadcrumb"
            >
              <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <li>
                  <Link href="/" className="text-white underline-offset-2 hover:underline">
                    Home
                  </Link>
                </li>
                <li className="text-white/60" aria-hidden>
                  /
                </li>
                <li>
                  <Link href="/blogs" className="text-white underline-offset-2 hover:underline">
                    Blogs
                  </Link>
                </li>
                <li className="text-white/60" aria-hidden>
                  /
                </li>
                <li className="max-w-[min(100%,520px)] truncate text-white" aria-current="page">
                  {title}
                </li>
              </ol>
            </nav>
            <h1 className="font-quattrocento mt-3 text-2xl font-normal uppercase tracking-normal text-white sm:mt-4 sm:text-3xl md:text-4xl">
              Blogs
            </h1>
          </div>
        </div>
      </section>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1480px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-12 2xl:px-16">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-12 xl:gap-16">
            <article className="min-w-0">
              <div className="relative isolate overflow-hidden [transform:translateZ(0)]">
                <figure className="overflow-hidden border border-[#EEEEEE] bg-[#FAFAFA]">
                  <BlogDetailHeroImage src={imageUrl} alt={title} />
                </figure>
                <Link
                  href="/blogs"
                  aria-label="All blogs"
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

              <p className="font-lato text-sm text-[#00000099] sm:text-base mt-4">
                By <span className="font-semibold text-[#111111]">Sanskar Realty</span>, {dateLine}
              </p>
              <h2 className="font-quattrocento mt-4 text-2xl font-normal leading-tight text-[#111111] sm:text-3xl md:text-[34px]">
                {title}
              </h2>

              <div
                className="blog-html-body mt-2 overflow-x-auto font-lato text-base leading-[1.75] text-[#333333] [&_a]:text-[#0a6d4a] [&_a]:underline [&_img]:max-w-full [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_table]:min-w-full [&_table]:border [&_table]:border-zinc-300 [&_table_th]:border [&_table_th]:border-zinc-300 [&_table_th]:bg-zinc-100 [&_table_th]:px-3 [&_table_th]:py-2 [&_table_td]:border [&_table_td]:border-zinc-300 [&_table_td]:px-3 [&_table_td]:py-2"
                dangerouslySetInnerHTML={{ __html: body }}
              />

              {/* <div className="mt-10 grid gap-4 border-t border-[#E5E5E5] pt-8 sm:grid-cols-2">
                <div className="min-w-0">
                  {prev ? (
                    <Link
                      href={`/blogs/${prev._id}`}
                      className="group flex items-start gap-3 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 transition-colors hover:border-[#F5AC00]/40 hover:bg-white"
                    >
                      <span
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D5D5D5] bg-white text-[#666666] group-hover:border-[#F5AC00] group-hover:text-[#F5AC00]"
                        aria-hidden
                      >
                        ←
                      </span>
                      <div className="min-w-0">
                        <span className="font-lato text-xs font-semibold uppercase tracking-wide text-[#666666]">
                          Previous
                        </span>
                        <p className="mt-1 line-clamp-2 font-quattrocento text-sm font-semibold text-[#111111] sm:text-base">
                          {shortHeading(prev.title)}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="min-w-0 sm:text-right">
                  {next ? (
                    <Link
                      href={`/blogs/${next._id}`}
                      className="group flex items-start justify-end gap-3 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 text-left transition-colors hover:border-[#F5AC00]/40 hover:bg-white sm:flex-row-reverse sm:text-right"
                    >
                      <span
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D5D5D5] bg-white text-[#666666] group-hover:border-[#F5AC00] group-hover:text-[#F5AC00]"
                        aria-hidden
                      >
                        →
                      </span>
                      <div className="min-w-0 sm:text-right">
                        <span className="font-lato text-xs font-semibold uppercase tracking-wide text-[#666666]">
                          Next
                        </span>
                        <p className="mt-1 line-clamp-2 font-quattrocento text-sm font-semibold text-[#111111] sm:text-base">
                          {shortHeading(next.title)}
                        </p>
                      </div>
                    </Link>
                  ) : null}
                </div>
              </div> */}
            </article>

            <aside className="min-w-0 space-y-6 lg:space-y-7">
              <BlogDetailSearch />
              {/* <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <h3 className="border-b border-[#D5D5D5] pb-3 font-quattrocento text-lg font-normal text-[#111111]">
                  Follow us
                </h3>
                <p className="mt-4 font-lato text-sm leading-relaxed text-[#555555]">
                  Stay connected for updates on projects, lifestyle, and community stories.
                </p>
              </div> */}
              <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:px-4 sm:py-6">
                <h3 className="border-b border-[#D5D5D5] pb-5 font-quattrocento text-[18px] font-normal leading-[100%] tracking-normal text-[#111111]">
                  Recent Blogs
                </h3>
                <ul className="mt-5 space-y-5">
                  {recentBlogs.map((item) => (
                    <li key={item.id}>
                      <Link href={`/blogs/${item.id}`} className="flex gap-3 min-[420px]:gap-4 hover:opacity-90">
                        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden sm:h-[80px] sm:w-[80px] rounded-sm">
                          <Image
                            src={item.image}
                            alt={item.title || "Recent blog"}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="line-clamp-2 break-words font-quattrocento text-[15px] font-semibold leading-[19px] tracking-normal text-[#111111]">
                            {shortHeading(item.title)}
                          </p>
                          <p className="mt-1 line-clamp-3 break-words font-lato text-[14px] font-normal leading-[19px] tracking-normal text-[#111111]">
                            {wordPreview(stripHtmlToPlainText(item.excerpt), 10)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:p-6">
                <Link
                  href="/blogs"
                  className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#F5AC00] bg-[#F5AC00] px-4 py-3 text-center font-lato text-sm font-semibold text-white transition-colors hover:bg-[#e09d00]"
                >
                  All blogs
                </Link>
              </div> */}
            </aside>
          </div>
        </div>
      </div>

      <FooterSection alignWithHeader />
    </>
  );
}
