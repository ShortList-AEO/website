"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { auditForm as copy } from "@/content/form";
import type { AuditField } from "@/lib/audit-schema";

type Errors = Partial<Record<AuditField | "server", string>>;
type Status = "idle" | "sending" | "sent";

const FIELDS: { name: AuditField; type: string; autoComplete: string; inputMode?: "url" | "email" | "tel" }[] = [
  { name: "brand", type: "text", autoComplete: "organization" },
  { name: "website", type: "text", autoComplete: "url", inputMode: "url" },
  { name: "founder", type: "text", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "whatsapp", type: "tel", autoComplete: "tel", inputMode: "tel" },
];

const input =
  "w-full rounded-[3px] border bg-surface px-3.5 py-3 text-[1rem] text-ink placeholder:text-muted/70 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // zod loads on first submit, keeping it out of the page's initial JavaScript.
    const { auditSchema } = await import("@/lib/audit-schema");
    const parsed = auditSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as AuditField;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = FIELDS.find((f) => next[f.name])?.name ?? (next.category ? "category" : undefined);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ server: copy.errors.server });
    }
  }

  if (status === "sent") {
    return (
      <m.div
        role="status"
        className="flex flex-col items-start gap-4 rounded-[4px] bg-surface p-8 text-ink"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        <svg viewBox="0 0 40 40" className="size-10" aria-hidden>
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
          <m.path
            d="M12 20.5l5.5 5.5L28.5 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          />
        </svg>
        <p className="font-display text-[1.6rem] font-bold">{copy.success.heading}</p>
        <p className="text-muted">{copy.success.body}</p>
      </m.div>
    );
  }

  const field = (name: AuditField) => copy.fields[name];
  const err = (name: AuditField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-[0.88rem] font-medium text-danger">
        {errors[name]}
      </p>
    ) : null;
  const border = (name: AuditField) => (errors[name] ? "border-danger" : "border-rule");

  return (
    <form noValidate action="/api/audit" method="post" onSubmit={onSubmit} className="grid gap-5 rounded-[4px] bg-surface p-5 text-ink sm:grid-cols-2 sm:p-8">
      {FIELDS.slice(0, 2).map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block text-[0.92rem] font-medium">
            {field(f.name).label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            inputMode={f.inputMode}
            autoComplete={f.autoComplete}
            placeholder={field(f.name).placeholder}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className={`${input} ${border(f.name)}`}
          />
          {err(f.name)}
        </div>
      ))}

      <div className="sm:col-span-2">
        <label htmlFor="category" className="mb-1.5 block text-[0.92rem] font-medium">
          {copy.fields.category.label}
        </label>
        <select
          id="category"
          name="category"
          defaultValue=""
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? "category-error" : undefined}
          className={`${input} ${border("category")} appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%2356636e' stroke-width='1.6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            {copy.fields.category.placeholder}
          </option>
          {copy.categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {err("category")}
      </div>

      {FIELDS.slice(2).map((f) => (
        <div key={f.name} className={f.name === "whatsapp" ? "sm:col-span-2" : undefined}>
          <label htmlFor={f.name} className="mb-1.5 block text-[0.92rem] font-medium">
            {field(f.name).label}
            {f.name === "whatsapp" ? <span className="ml-2 font-normal text-muted">{copy.fields.whatsapp.hint}</span> : null}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            inputMode={f.inputMode}
            autoComplete={f.autoComplete}
            placeholder={field(f.name).placeholder}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className={`${input} ${border(f.name)}`}
          />
          {err(f.name)}
        </div>
      ))}

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">Company URL</label>
        <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2">
        {errors.server ? (
          <p role="alert" className="text-[0.92rem] font-medium text-danger">
            {errors.server}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center rounded-[3px] bg-ink px-5 py-3.5 text-[1rem] font-semibold text-bg hover:opacity-90 disabled:opacity-60 sm:w-auto sm:self-start"
        >
          {status === "sending" ? copy.submitting : copy.submit}
        </button>
        <p className="text-[0.85rem] text-muted">{copy.privacy}</p>
      </div>
    </form>
  );
}
