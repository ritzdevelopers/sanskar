// import Link from "next/link";

// import { API_BASE } from "./lib";

// export default function DashboardPage() {
//   return (
//     <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900">
//       <div className="mx-auto max-w-md">
//         <header className="mb-8 flex items-end justify-between gap-4 border-b border-zinc-200 pb-6">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
//             <p className="mt-1 text-sm text-zinc-600">
//               Register alag page, sign in alag page.
//             </p>
//           </div>
//           <Link
//             href="/"
//             className="text-sm font-medium text-emerald-700 hover:underline"
//           >
//             Home
//           </Link>
//         </header>

//         <p className="mb-6 font-mono text-xs text-zinc-500">{API_BASE}</p>

//         <div className="flex flex-col gap-3">
//           <Link
//             href="/dashboard/login"
//             className="rounded-xl border-2 border-zinc-800 bg-zinc-800 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-900"
//           >
//             Sign in
//           </Link>
//           <Link
//             href="/dashboard/register"
//             className="rounded-xl border-2 border-emerald-600 bg-emerald-50 py-3 text-center text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
//           >
//             Register staff
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }
export { default } from "./staff/page";