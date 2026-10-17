import type { Metadata } from "next";
import Link from "next/link";
import { auditForm } from "@/content/form";
import { site } from "@/content/site";

export const metadata: Metadata = { title: `${auditForm.success.heading} ${site.name}`, robots: { index: false } };

/** Shown after a no-JavaScript form submission (the normal path shows success inline). */
export default function AuditReceived() {
  return (
    <main id="main" className="wrap flex min-h-[70svh] flex-col justify-center gap-5 py-24">
      <h1 className="t-h2">{auditForm.success.heading}</h1>
      <p className="t-lede text-muted">{auditForm.success.body}</p>
      <Link href="/" className="w-fit underline decoration-rule underline-offset-4 hover:decoration-ink">
        Back to {site.name}
      </Link>
    </main>
  );
}
