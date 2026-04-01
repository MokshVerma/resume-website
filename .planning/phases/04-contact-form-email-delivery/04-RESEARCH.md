# Phase 4: Contact Form & Email Delivery - Research

**Researched:** 2026-04-01
**Domain:** Next.js contact form with Resend email delivery, Zod validation, rate limiting
**Confidence:** HIGH

## Summary

This phase implements a `/contact` page with a validated form that sends email via the Resend SDK. The core technical domain involves three concerns: (1) a Client Component form with multi-state UI (idle, loading, success, error, rate-limited), (2) a server-side API endpoint that validates with Zod, enforces IP-based rate limiting, and sends email via Resend, and (3) a simple HTML email template delivered to mokshverma98@gmail.com.

The stack is fully locked by CLAUDE.md and CONTEXT.md: Resend for email, Zod for validation, Next.js Route Handler or Server Action for the API. The main architectural decision left to discretion is Route Handler vs Server Action -- research recommends a **Route Handler** (`POST /api/contact`) because it gives direct access to request headers (needed for IP-based rate limiting) and returns structured JSON responses that the client form can easily consume. Server Actions can work but make IP extraction and rate limiting more awkward since they operate at a higher abstraction level.

**Primary recommendation:** Use a Route Handler at `src/app/api/contact/route.ts` with Zod validation, in-memory Map-based rate limiting, and Resend SDK for email delivery. The contact page is a Client Component at `src/app/contact/page.tsx` that manages form state with `useState` and submits via `fetch`.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Centered glassmorphism card -- form sits inside a glass/blur card centered on the page, consistent with project cards from Phase 2
- **D-02:** Dark surface inputs (#141414 background, #27272a border) with accent blue (#3b82f6) focus ring -- matches dark theme
- **D-03:** Short heading + one-liner intro above the form -- "Get in Touch" heading with a brief line like "Have a question or want to work together? Drop me a message."
- **D-04:** Medium textarea (4-5 rows) for the message field -- enough for a paragraph, resizable
- **D-05:** Loading state: disabled submit button with spinner icon and "Sending..." text, all fields disabled
- **D-06:** Success state: form replaced with inline success message + checkmark icon inside the same card -- "Message sent! I'll get back to you soon." with option to send another
- **D-07:** Validation errors: inline per-field -- red text below each invalid field, field border turns red
- **D-08:** Server error: inline error banner above the form -- "Something went wrong. Please try again or email me directly at mokshverma98@gmail.com." Form data kept intact.
- **D-09:** Simple HTML email -- clean layout with sender name, email, message body, and timestamp. Readable in any client, no heavy styling.
- **D-10:** Subject line format: "Portfolio Contact: {name}" -- includes sender name for quick identification and inbox filtering
- **D-11:** Rate limit message: inline error banner (same style as server error) -- "You've already sent a message recently. Please try again in a minute." Form data kept intact.
- **D-12:** Server-side only enforcement -- in-memory IP tracking on the API route. No client-side cooldown state.

### Claude's Discretion
- Submit button styling and hover effects
- Glassmorphism card blur intensity and opacity (match Phase 2 project cards)
- Success checkmark icon choice (react-icons)
- HTML email template exact styling
- Field placeholder text
- Form field label styling
- Whether to use Server Action vs Route Handler for the API endpoint
- Exact error message wording (within the patterns described above)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CNTC-01 | Separate contact page (/contact) with a form (name, email, message fields) | Next.js file-based routing: `src/app/contact/page.tsx`. Navigation and hero CTA already link to `/contact`. Form uses glassmorphism card pattern from project-card.tsx. |
| CNTC-02 | Contact form submissions delivered to mokshverma98@gmail.com via Resend | Resend SDK `resend.emails.send()` with `to: "mokshverma98@gmail.com"`. Requires `RESEND_API_KEY` env var. Can use `onboarding@resend.dev` as sender during development before domain verification. |
| CNTC-03 | Contact form validates inputs client-side and server-side (Zod) | Zod schema with `z.string().min(1)` for name, `z.string().email()` for email, `z.string().min(1)` for message. `safeParse` on server returns field-level errors via `error.flatten()`. Client-side mirrors with HTML5 `required` + pattern attributes for instant feedback. |
| CNTC-04 | Contact form shows clear loading, success, and error states | Client Component with `useState` for `status: "idle" | "loading" | "success" | "error" | "rate-limited"`. Decisions D-05 through D-08 and D-11 define exact UI per state. |
| CNTC-05 | Contact API route has rate limiting (1 request per IP per minute) | In-memory `Map<string, number>` storing last submission timestamp per IP. IP extracted from `x-forwarded-for` header (set by Vercel) or `x-real-ip` fallback. 60-second window. Returns 429 status with distinct message. |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack:** Next.js + React, Resend for email, Zod for validation
- **No Nodemailer:** Explicitly forbidden on Vercel (cold start issues, SMTP connection pooling)
- **No component libraries:** Custom Tailwind components only
- **No database:** No dynamic data storage
- **Budget:** Free tier only (Resend free: 3K emails/month)
- **Server Components by default:** Client Components only when needed (form needs `"use client"`)
- **Glassmorphism via inline styles:** Not Tailwind, for reliable rgba backgrounds (established pattern)
- **Import alias:** `@/*` maps to `./src/*`

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Verified |
|---------|---------|---------|----------|
| Next.js | 15.5.14 | App Router, Route Handlers | package.json |
| React | 19.1.0 | UI, useState for form state | package.json |
| TypeScript | ^5 | Type safety | package.json |
| Tailwind CSS | ^4 | Styling (CSS-first config) | package.json |
| react-icons | ^5.6.0 | Spinner, checkmark, error icons | package.json |

### To Install
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| resend | 6.10.0 | Email delivery SDK | Locked by CLAUDE.md. HTTP API, serverless-native, free tier 3K emails/month |
| zod | 3.24.4 | Schema validation | Locked by CLAUDE.md. Use 3.x stable, NOT 4.x (too new). safeParse + flatten for field errors |

**Note on Zod version:** npm shows latest Zod is 4.3.6 (Zod 4 / "zod-mini" rewrite). CLAUDE.md specifies Zod 3.x. Install with `npm install zod@3` to pin to 3.x line. Verified latest 3.x on npm is 3.24.4.

**Installation:**
```bash
npm install resend zod@3
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/
    contact/
      page.tsx           # Contact page (Client Component — form state)
    api/
      contact/
        route.ts         # POST Route Handler (validation, rate limit, Resend)
  lib/
    data.ts              # Existing — personalInfo.email for fallback display
    contact-schema.ts    # Zod schema (shared between client hint and server)
```

### Pattern 1: Route Handler for Contact API
**What:** `POST /api/contact` Route Handler with Zod validation, rate limiting, and Resend email sending
**When to use:** Contact form submission
**Why over Server Action:** Route Handlers provide direct access to the `NextRequest` object and `headers()` for IP extraction. They return `Response.json()` which the client can parse for status-specific handling. Server Actions abstract away HTTP details, making rate limiting by IP harder to implement cleanly.

```typescript
// Source: Next.js official docs (Route Handlers) + Resend docs
// src/app/api/contact/route.ts
import { type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit store
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const lastSubmission = rateLimitMap.get(ip);
  if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_WINDOW) {
    return true;
  }
  return false;
}

export async function POST(request: NextRequest) {
  // 1. Rate limit check
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "rate_limited", message: "Too many requests" },
      { status: 429 }
    );
  }

  // 2. Parse and validate body
  const body = await request.json();
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "validation_error", fieldErrors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // 3. Send email
  const { name, email, message } = result.data;
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>", // Change to verified domain in production
    to: "mokshverma98@gmail.com",
    replyTo: email,
    subject: `Portfolio Contact: ${name}`,
    html: `...`, // HTML template
  });

  if (error) {
    return Response.json(
      { error: "send_failed", message: "Failed to send email" },
      { status: 500 }
    );
  }

  // 4. Record successful submission for rate limiting
  rateLimitMap.set(ip, Date.now());

  return Response.json({ success: true });
}
```

### Pattern 2: Zod Schema with flatten() for Field Errors
**What:** Shared Zod schema that produces per-field error messages
**When to use:** Server-side validation with field-level error reporting

```typescript
// src/lib/contact-schema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required").max(5000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

Server-side usage:
```typescript
const result = contactSchema.safeParse(body);
if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors;
  // fieldErrors: { name?: string[], email?: string[], message?: string[] }
}
```

### Pattern 3: Client Component Form with Multi-State UI
**What:** Contact form managing idle/loading/success/error/rate-limited states
**When to use:** The contact page

```typescript
"use client";
import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error" | "rate-limited";

interface FieldErrors {
  name?: string[];
  email?: string[];
  message?: string[];
}

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setStatus("rate-limited");
      } else if (data.fieldErrors) {
        setFieldErrors(data.fieldErrors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }
  // ... render form with conditional UI per status
}
```

### Pattern 4: Glassmorphism Card (Reuse from project-card.tsx)
**What:** Glass/blur card container matching existing design language
**Established pattern from project-card.tsx:**
```typescript
<div
  className="rounded-xl p-4 md:p-6"
  style={{
    background: "rgba(20, 20, 20, 0.8)", // Slightly more opaque than project cards (0.6)
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(39, 39, 42, 0.5)",
  }}
>
  {/* form content */}
</div>
```

### Anti-Patterns to Avoid
- **Don't use FormData submission to Server Action for this:** Server Actions make it harder to extract client IP for rate limiting, and returning structured JSON errors requires `useActionState` which adds complexity
- **Don't store rate limit data in a database:** In-memory Map is sufficient for a portfolio site on Vercel (single instance). A database would be overkill
- **Don't use `request.ip`:** Removed in Next.js 15. Use `x-forwarded-for` header instead
- **Don't use Zod 4.x:** Too new, CLAUDE.md specifies Zod 3.x
- **Don't use Tailwind for glassmorphism:** Project uses inline styles for rgba backgrounds (avoids Tailwind v4 hex+opacity issues)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery | SMTP client, Nodemailer | Resend SDK | Serverless-native, no connection pooling issues, free tier |
| Schema validation | Manual if/else checks | Zod `safeParse` + `flatten` | Type inference, field-level errors, composable schemas |
| Email format validation | Regex patterns | `z.string().email()` | Zod handles RFC-compliant email validation |
| Loading spinner icon | Custom SVG animation | `react-icons` (e.g., `AiOutlineLoading3Quarters` with CSS spin) | Already installed, tree-shakeable |

## Common Pitfalls

### Pitfall 1: NextRequest.ip Removed in Next.js 15
**What goes wrong:** Code tries to use `request.ip` and gets `undefined`
**Why it happens:** `ip` and `geo` properties were removed from NextRequest in v15.0.0
**How to avoid:** Extract IP from `request.headers.get("x-forwarded-for")` (first value, comma-separated) with `x-real-ip` as fallback. On Vercel, `x-forwarded-for` is always set.
**Warning signs:** Rate limiting never triggers because IP is always "unknown"

### Pitfall 2: In-Memory Rate Limit Resets on Cold Start
**What goes wrong:** Rate limit Map is empty after serverless function cold start, allowing rapid re-submission
**Why it happens:** Vercel serverless functions are stateless; module-level variables reset on new instances
**How to avoid:** Accept this as a limitation for a portfolio site. The rate limit still works within a warm instance (covers most spam scenarios). For production-grade limiting, you'd need Redis or Vercel KV, but that's overkill here.
**Warning signs:** N/A -- this is an accepted tradeoff per D-12

### Pitfall 3: Resend Domain Verification Required for Production
**What goes wrong:** Emails sent from unverified domain get rejected (403 error)
**Why it happens:** Resend requires SPF and DKIM DNS records for custom sending domains
**How to avoid:** Use `onboarding@resend.dev` as the `from` address during development. For production, verify `mokshverma.in` domain in Resend dashboard (add SPF + DKIM DNS records). Use `replyTo: senderEmail` so Moksh can reply directly to the visitor.
**Warning signs:** 403 errors with "domain not verified" message from Resend API

### Pitfall 4: Missing RESEND_API_KEY Environment Variable
**What goes wrong:** Resend constructor silently initializes with undefined key, then all sends fail with 401
**Why it happens:** `.env.local` not created, or env var not set in Vercel dashboard
**How to avoid:** Check for `process.env.RESEND_API_KEY` at the top of the Route Handler. In development, create `.env.local` with the key. In Vercel, add it as an Environment Variable in the dashboard. The `.env*` pattern is already in `.gitignore`.
**Warning signs:** All form submissions return 500 errors

### Pitfall 5: Rate Limit Map Memory Leak
**What goes wrong:** Map grows unbounded over time if never cleaned
**Why it happens:** Entries are added but never removed
**How to avoid:** Periodically prune stale entries. Since Vercel functions are short-lived, this is mostly theoretical, but good practice is to clean up entries older than the rate limit window at the start of each request (or just accept it -- the function will restart).
**Warning signs:** N/A for serverless (function restarts clean it)

### Pitfall 6: Client-Side Validation Not Matching Server
**What goes wrong:** Client allows submission that server rejects, or vice versa
**Why it happens:** Validation rules defined in two places without sharing
**How to avoid:** Use HTML5 `required` and `type="email"` for instant client feedback. The Zod schema on the server is the source of truth. Server errors are displayed per-field when returned. Don't duplicate complex Zod logic on the client.

## Code Examples

### HTML Email Template
```typescript
function buildEmailHtml(name: string, email: string, message: string): string {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        New Portfolio Contact
      </h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Sent:</strong> ${timestamp}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <div style="white-space: pre-wrap; line-height: 1.6; color: #374151;">
        ${message}
      </div>
    </div>
  `;
}
```

### Input Field Pattern (Dark Theme)
```tsx
<div>
  <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">
    Name
  </label>
  <input
    id="name"
    name="name"
    type="text"
    required
    placeholder="Your name"
    className="w-full rounded-lg bg-surface border border-border px-4 py-3 text-body text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
    style={{ backgroundColor: "#141414", borderColor: "#27272a" }}
  />
  {fieldErrors.name && (
    <p className="mt-1 text-sm text-red-400">{fieldErrors.name[0]}</p>
  )}
</div>
```

### Rate Limit Cleanup (Optional)
```typescript
function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [ip, timestamp] of rateLimitMap) {
    if (now - timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `request.ip` for IP | `x-forwarded-for` header | Next.js 15.0.0 | Must parse header manually |
| `headers()` sync | `headers()` async (returns Promise) | Next.js 15.0.0 | Must await in Route Handlers |
| Zod 3.x | Zod 4.x available | 2025 | Stick with 3.x per CLAUDE.md; 4.x is too new |
| Nodemailer on serverless | Resend HTTP API | 2023+ | No SMTP connection pooling issues |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CNTC-01 | Contact page renders form with 3 fields | smoke | Manual browser check | N/A |
| CNTC-02 | POST /api/contact sends email via Resend | integration | Needs Resend mock | N/A |
| CNTC-03 | Zod validates name, email, message; rejects invalid | unit | Test Zod schema directly | N/A |
| CNTC-04 | Form shows loading/success/error states | smoke | Manual browser check | N/A |
| CNTC-05 | Rate limit returns 429 on rapid requests | unit | Test rate limit function directly | N/A |

### Sampling Rate
- **Per task commit:** `npx next build` (catches type errors, import errors)
- **Per wave merge:** `npx next build` + manual form test
- **Phase gate:** Build succeeds + manual form submission test

### Wave 0 Gaps
No test framework is installed. Given this is a portfolio site with minimal testable logic (the Zod schema and rate limiter are the only pure functions), the build command (`next build`) serves as the primary automated validation. Manual testing of the form UI states is required.

If the planner wants to add a test framework:
- [ ] Install vitest: `npm install -D vitest`
- [ ] `vitest.config.ts` with path aliases matching tsconfig
- [ ] `tests/contact-schema.test.ts` -- covers CNTC-03
- [ ] `tests/rate-limit.test.ts` -- covers CNTC-05

**Recommendation:** Skip formal test framework for this phase. The primary validation is `next build` + manual browser testing. The Zod schema and rate limiter are small enough to verify by inspection.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Runtime | Yes | 23.11.0 | -- |
| npm | Package install | Yes | 10.9.2 | -- |
| Resend API key | CNTC-02 (email sending) | No (.env.local not created) | -- | Use onboarding@resend.dev for dev, add key before deploy |

**Missing dependencies with no fallback:**
- `RESEND_API_KEY` environment variable -- must be obtained from https://resend.com/api-keys and added to `.env.local` for local dev and Vercel dashboard for production

**Missing dependencies with fallback:**
- Verified sending domain -- use `onboarding@resend.dev` as `from` address during development (limited to sending to account owner's email only). For production, verify `mokshverma.in` in Resend dashboard.

## Open Questions

1. **Resend domain verification timing**
   - What we know: `onboarding@resend.dev` works for testing. Production needs verified domain with SPF + DKIM DNS records.
   - What's unclear: Whether mokshverma.in DNS is managed by Vercel or another provider, and how long verification takes (typically 24-72 hours).
   - Recommendation: Use `onboarding@resend.dev` for development and initial deployment. Domain verification can happen asynchronously and is a configuration change, not a code change. Plan should include a task for creating `.env.local` setup instructions.

2. **Rate limit effectiveness on Vercel serverless**
   - What we know: In-memory Map resets on cold start. Vercel may run multiple instances.
   - What's unclear: How often Vercel cold-starts a hobby-tier function.
   - Recommendation: Accept the limitation (per D-12). The rate limit works well enough for a portfolio site -- it prevents rapid-fire submissions within a warm instance, which covers the most common abuse scenario. No need to add Redis/KV complexity.

## Sources

### Primary (HIGH confidence)
- Next.js official docs (v16.2.2, applicable to 15.x) -- Route Handlers, NextRequest API, headers() function
- Resend official docs -- SDK usage, send-with-nextjs guide, API error codes, domain verification
- Zod official docs -- safeParse, flatten, schema definition
- npm registry -- resend@6.10.0, zod@3.24.4 (latest 3.x)
- Project codebase -- package.json (Next.js 15.5.14, React 19.1.0), existing component patterns

### Secondary (MEDIUM confidence)
- Resend testing addresses (onboarding@resend.dev, delivered@resend.dev) -- documented in Resend send-with-nextjs guide

### Tertiary (LOW confidence)
- None -- all findings verified with primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries locked by CLAUDE.md, versions verified on npm
- Architecture: HIGH -- Route Handler pattern well-documented in Next.js docs, Resend SDK is simple
- Pitfalls: HIGH -- NextRequest.ip removal verified in official changelog, rate limiting tradeoffs well-understood
- Email delivery: MEDIUM -- domain verification flow not tested locally, but well-documented by Resend

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable libraries, no fast-moving concerns)
