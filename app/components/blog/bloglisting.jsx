import Image from "next/image";
import Link from "next/link";

const EXCERPT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo Ut enim ad minim veniam";

const POSTS = [
  {
    id: "1",
    title: "How Will 2026 Homes Be Different from Today’s Living Spaces?",
    author: "admin",
    date: "October 18, 2019",
    excerpt: EXCERPT,
  },
  {
    id: "2",
    title:
      "Redefining Urban Living: Design Trends That Shape Modern Residences",
    author: "admin",
    date: "October 12, 2019",
    excerpt: EXCERPT,
  },
];

const RECENT_POST_SNIPPET =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ....";

const RECENT = [
  {
    image: "/assets/recentpost2.jpg",
    date: "October 18, 2019",
  },
  {
    image: "/assets/recent-post1.jpg",
    date: "October 15, 2019",
  },
  {
    image: "/assets/recentpost3.jpg",
    date: "October 10, 2019",
  },
];

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
  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-[72px] xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 space-y-14 sm:space-y-16 lg:space-y-[4.5rem]">
            {POSTS.map((post) => (
              <article key={post.id} className="min-w-0">
                <Link href="#" className="block overflow-hidden">
                  <Image
                    src="/assets/section-2image.jpg"
                    alt=""
                    width={900}
                    height={506}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 65vw, 100vw"
                  />
                </Link>
                <h2 className="font-quattrocento mt-6 text-[24px] font-normal leading-normal md:leading-[100%] tracking-normal text-[#000000] sm:mt-7">
                  {post.title}
                </h2>
                <p className="mt-3 font-lato text-[16px] font-normal leading-[19px] tracking-normal text-[#00000099]">
                  By{" "}
                  <span className="font-semibold texhray]">
                    {post.author}
                  </span>
                  , {post.date}
                </p>
                <div
                  className="mt-3 h-px w-full bg-[#D5D5D5]"
                  aria-hidden
                />
                <p className="mt-4 font-lato text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]">
                  {post.excerpt}
                </p>
                <Link
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 font-lato text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]"
                >
                  <span className="leading-[24px]">Read more</span>
                  <span className="inline-flex shrink-0 items-center leading-none">
                    <Image
                      src="/assets/arrow.svg"
                      alt=""
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
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Previous page"
              >
                <Image
                  src="/assets/leftarrow.svg"
                  alt=""
                  width={8}
                  height={12}
                  className="block object-contain"
                />
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#F5AC00] bg-white font-lato text-[14px] font-normal leading-none text-[#F5AC00]"
                aria-current="page"
                aria-label="Page 1"
              >
                1
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Page 2"
              >
                2
              </button>
              <span
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666]"
                aria-hidden
              >
                ...
              </span>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Page 9"
              >
                9
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Page 10"
              >
                10
              </button>
              <button
                type="button"
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#D5D5D5] bg-white font-lato text-[14px] font-normal leading-none text-[#666666] transition-colors hover:bg-[#FAFAFA]"
                aria-label="Next page"
              >
                <Image
                  src="/assets/rightarrrow.svg"
                  alt=""
                  width={8}
                  height={12}
                  className="block object-contain"
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
            </div>

            <div className="rounded-sm border border-[#EEEEEE] bg-white p-5 sm:px-4 sm:py-6">
              <h3 className="border-b border-[#D5D5D5] pb-5 font-quattrocento text-[18px] font-normal leading-[100%] tracking-normal text-[#111111]">
                Recent Posts
              </h3>
              <ul className="mt-5 space-y-5">
                {RECENT.map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="flex gap-3 min-[420px]:gap-4 hover:opacity-90"
                    >
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[5px] sm:h-[80px] sm:w-[80px]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="font-lato text-[15px] font-normal leading-[19px] tracking-normal text-[#111111]">
                          {RECENT_POST_SNIPPET}
                        </p>
                        <p className="mt-1.5 font-quattrocento text-[14px] font-normal leading-[19px] tracking-normal text-[#00000099]">
                          {item.date}
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
                  src="/assets/section-2image.jpg"
                  alt=""
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
