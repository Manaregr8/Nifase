import { NextResponse } from "next/server";
<<<<<<< HEAD
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-info";

const LEAD_WINDOW_MS = 60_000;
const LEAD_ATTEMPT_LIMIT = 20;

const toText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return String(value);
};

const trimOrEmpty = (value) => toText(value).trim();

const truncate = (value, maxLen = 4000) => {
  const text = toText(value);
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen);
};

export async function POST(request) {
  const ip = await getClientIp(request);

  const isAllowed = rateLimit({
    key: `leads:${ip}`,
    limit: LEAD_ATTEMPT_LIMIT,
    windowMs: LEAD_WINDOW_MS,
  });

  if (!isAllowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const scriptUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Google Sheets integration is not configured (missing GOOGLE_SHEETS_WEBAPP_URL)." },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const form = trimOrEmpty(body?.form || body?.source);
  if (!form) {
    return NextResponse.json({ error: "Missing required field: form" }, { status: 400 });
  }

  const nowIso = new Date().toISOString();
  const key = process.env.GOOGLE_SHEETS_WEBAPP_KEY || "";

  const payload = {
    ...body,
    form,
    submittedAt: nowIso,
    ip,
    userAgent: truncate(request.headers.get("user-agent") || ""),
    referer: truncate(request.headers.get("referer") || ""),
    key: key ? key : undefined,
  };

  for (const [k, v] of Object.entries(payload)) {
    if (typeof v === "string") {
      payload[k] = truncate(v);
    }
  }

  try {
    const upstream = await fetch(scriptUrl, {
=======
import { getClientIp } from "@/lib/request-info";

const DEFAULT_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbygGsePN1WmXmo1cVMkEe0O2xD6cgnePJlLK2XuhpJjqrGe4fm8wWoE-MwPZ7DoAbRr/exec";

export async function POST(request) {
  try {
    const payload = await request.json();

    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const phone = String(payload?.phone ?? "").replace(/\D/g, "");

    if (!name || !email || phone.length !== 10) {
      return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
    }

    const ip = await getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";

    const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL || DEFAULT_WEBAPP_URL;
    const key = process.env.GOOGLE_SHEETS_WEBAPP_KEY || "";

    const body = {
      submittedAt: new Date().toISOString(),
      form: String(payload?.form ?? "course-enquiry"),
      name,
      phone,
      phoneRaw: String(payload?.phoneRaw ?? payload?.phone ?? "").trim(),
      email,
      course: String(payload?.course ?? "").trim(),
      subject: String(payload?.subject ?? "").trim(),
      message: String(payload?.message ?? "").trim(),
      contextTitle: String(payload?.contextTitle ?? "").trim(),
      defaultCourseSlug: String(payload?.defaultCourseSlug ?? "").trim(),
      pageUrl: String(payload?.pageUrl ?? "").trim(),
      ip,
      userAgent,
      referer,
    };

    if (key) {
      body.key = key;
    }

    const upstream = await fetch(webappUrl, {
>>>>>>> 5871f98cbb9cd444d703669326db2ad470db6180
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
<<<<<<< HEAD
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "";
    const text = await upstream.text();

    const looksLikeHtml = contentType.includes("text/html") || /^\s*</.test(text);
    const looksLikeGoogleLogin = /accounts\.google\.com\/(text|signin)|google\.com\/v3\/signin|Sign in/i.test(text);
    const looksLikeDriveError = /unable to open the file at present|Page not found/i.test(text);

    const isProd = process.env.NODE_ENV === "production";

    const devDiagnostics = !isProd
      ? {
          upstreamStatus: upstream.status,
          upstreamContentType: contentType,
          upstreamBodyPreview: text.slice(0, 240),
        }
      : undefined;

    if (!upstream.ok) {
      console.error("POST /api/leads: Apps Script error", upstream.status, text);

      if (looksLikeHtml || looksLikeGoogleLogin || looksLikeDriveError) {
        return NextResponse.json(
          {
            error:
              "Google Apps Script Web App is not publicly accessible. Re-deploy it as a Web app with access set to 'Anyone' and use the /exec URL.",
            ...devDiagnostics,
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          error: "Unable to record lead",
          ...devDiagnostics,
        },
        { status: 502 },
      );
    }

    if (looksLikeHtml || looksLikeGoogleLogin || looksLikeDriveError) {
      console.error("POST /api/leads: received HTML from Apps Script", { contentType });
      return NextResponse.json(
        {
          error:
            "Google Apps Script Web App returned an HTML page (likely auth redirect). Re-deploy it as a Web app with access set to 'Anyone' and use the /exec URL.",
          ...devDiagnostics,
        },
        { status: 502 },
      );
    }

    try {
      const json = JSON.parse(text);
      if (json && json.ok === false) {
        return NextResponse.json({ error: json.error || "Unable to record lead" }, { status: 502 });
      }
    } catch {
      // Apps Script may return plain text; treat as success if upstream OK.
=======
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await upstream.text();

    let parsed = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    if (!upstream.ok || parsed?.ok === false) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed?.error || "Lead submission failed",
        },
        { status: 502 }
      );
>>>>>>> 5871f98cbb9cd444d703669326db2ad470db6180
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/leads failed", error);
<<<<<<< HEAD
    return NextResponse.json({ error: "Unable to reach Google Sheets endpoint" }, { status: 502 });
  }
}
=======
    return NextResponse.json({ ok: false, error: "Unable to submit lead" }, { status: 500 });
  }
}
>>>>>>> 5871f98cbb9cd444d703669326db2ad470db6180
