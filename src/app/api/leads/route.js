import { NextResponse } from "next/server";
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return NextResponse.json({ ok: false, error: "Unable to submit lead" }, { status: 500 });
  }
}