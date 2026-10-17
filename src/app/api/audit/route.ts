import { NextResponse } from "next/server";
import { Resend } from "resend";
import { auditSchema } from "@/lib/audit-schema";

/**
 * Receives an audit request and emails it to us via Resend.
 * Never logs or returns the API key. Without RESEND_API_KEY: in development the lead is logged
 * to the server console; in production the request fails with 503 so nothing is silently lost.
 */
export async function POST(request: Request) {
  // JSON from the enhanced form; a plain form post when JavaScript hasn't loaded.
  const isForm = (request.headers.get("content-type") ?? "").includes("application/x-www-form-urlencoded");
  let body: unknown;
  try {
    body = isForm ? Object.fromEntries(await request.formData()) : await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const done = (status = 200, extra: Record<string, unknown> = {}) =>
    isForm && status < 300
      ? NextResponse.redirect(new URL("/audit-received", request.url), 303)
      : NextResponse.json({ ok: status < 300, ...extra }, { status });

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend success so it doesn't retry.
    const honeypot = typeof body === "object" && body !== null && "company_url" in body && (body as { company_url?: unknown }).company_url;
    if (honeypot) return done();
    return NextResponse.json({ ok: false, error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 422 });
  }

  const lead = parsed.data;
  const text = [
    `Brand: ${lead.brand}`,
    `Website: ${lead.website}`,
    `Category: ${lead.category}`,
    `Founder: ${lead.founder}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp || "not given"}`,
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[audit] email not configured; lead received:\n${text}`);
      return done(200, { delivered: false });
    }
    console.error("[audit] email not configured (RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL)");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: lead.email,
    subject: `Audit request: ${lead.brand} (${lead.category})`,
    text,
  });
  if (error) {
    console.error(`[audit] send failed: ${error.name}`);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return done(200, { delivered: true });
}
