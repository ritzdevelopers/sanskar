import { NextResponse } from "next/server";

import { ENQUIRE_GOOGLE_SCRIPT_DEFAULT_URL } from "@/lib/enquireConfig";

function scriptUrl(): string {
  return (
    process.env.ENQUIRE_GOOGLE_SCRIPT_URL?.trim() ||
    ENQUIRE_GOOGLE_SCRIPT_DEFAULT_URL
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { ok: false, message: "Invalid body" },
      { status: 400 },
    );
  }

  const body = JSON.stringify(payload);

  try {
    const upstream = await fetch(scriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    const text = await upstream.text();

    if (upstream.status === 401 || upstream.status === 403) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Google Web App blocked this request (not signed in). In Apps Script: Deploy → Web app → set “Who has access” to Anyone (not only your organisation). Workspace scripts at script.google.com/a/macros/... need anonymous or “Anyone with the link” access so your website server can POST.",
        },
        { status: 502 },
      );
    }

    const ct =
      upstream.headers.get("content-type") ?? "text/plain; charset=utf-8";
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": ct },
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Upstream request failed";
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }
}
