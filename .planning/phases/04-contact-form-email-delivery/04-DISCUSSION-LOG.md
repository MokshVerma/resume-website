# Phase 4: Contact Form & Email Delivery - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-01
**Phase:** 04-contact-form-email-delivery
**Areas discussed:** Form layout & styling, Submission feedback states, Email content & format, Rate limiting UX

---

## Form Layout & Styling

| Option | Description | Selected |
|--------|-------------|----------|
| Centered card | Form inside a glassmorphism card, centered on page. Matches project cards aesthetic. | ✓ |
| Full-width section | Form spans full content width like home page sections. | |
| Split layout | Form on one side, contact info/social links on the other. | |

**User's choice:** Centered card
**Notes:** Recommended option, consistent with Phase 2 glassmorphism.

| Option | Description | Selected |
|--------|-------------|----------|
| Dark surface inputs | Dark background (#141414) with subtle border (#27272a), accent blue focus ring. | ✓ |
| Outlined inputs | Transparent background with visible border, accent border on focus. | |
| Underline-only inputs | No border or background, just a bottom line. | |

**User's choice:** Dark surface inputs
**Notes:** Consistent with dark theme.

| Option | Description | Selected |
|--------|-------------|----------|
| Short heading + one-liner | "Get in Touch" heading with brief intro line. | ✓ |
| Heading only | Just "Get in Touch" — form speaks for itself. | |
| You decide | Claude picks. | |

**User's choice:** Short heading + one-liner

| Option | Description | Selected |
|--------|-------------|----------|
| Medium textarea (4-5 rows) | Enough for a paragraph, resizable. | ✓ |
| Large textarea (6-8 rows) | Encourages longer messages. | |
| You decide | Claude picks. | |

**User's choice:** Medium textarea (4-5 rows)

---

## Submission Feedback States

| Option | Description | Selected |
|--------|-------------|----------|
| Disabled button with spinner | Submit button shows spinner + "Sending...", all fields disabled. | ✓ |
| Full form overlay | Semi-transparent overlay on entire card with centered spinner. | |
| You decide | Claude picks. | |

**User's choice:** Disabled button with spinner

| Option | Description | Selected |
|--------|-------------|----------|
| Inline success message | Form replaced with success message + checkmark inside same card. | ✓ |
| Toast notification | Form resets, toast appears. | |
| Redirect to thank-you | Navigate to /contact/thank-you page. | |

**User's choice:** Inline success message

| Option | Description | Selected |
|--------|-------------|----------|
| Inline per-field errors | Red text below each invalid field, border turns red. | ✓ |
| Summary at top | Error summary above form listing all issues. | |
| You decide | Claude picks. | |

**User's choice:** Inline per-field errors

| Option | Description | Selected |
|--------|-------------|----------|
| Inline error banner | Banner above form with error + direct email fallback. | ✓ |
| You decide | Claude handles. | |

**User's choice:** Inline error banner

---

## Email Content & Format

| Option | Description | Selected |
|--------|-------------|----------|
| Simple HTML | Clean HTML with sender name, email, message, timestamp. | ✓ |
| Plain text only | No HTML, raw fields. | |
| You decide | Claude picks. | |

**User's choice:** Simple HTML

| Option | Description | Selected |
|--------|-------------|----------|
| "Portfolio Contact: {name}" | Includes sender name for identification. | ✓ |
| "New message from {name}" | More casual. | |
| You decide | Claude picks. | |

**User's choice:** "Portfolio Contact: {name}"

---

## Rate Limiting UX

| Option | Description | Selected |
|--------|-------------|----------|
| Inline error banner | Same style as server error, "already sent recently" message. | ✓ |
| Disabled button with countdown | Button grays out with remaining seconds. | |
| You decide | Claude picks. | |

**User's choice:** Inline error banner

| Option | Description | Selected |
|--------|-------------|----------|
| Server-side only | In-memory IP tracking on API route. | ✓ |
| Both client + server | Client cooldown + server IP check. | |
| You decide | Claude picks. | |

**User's choice:** Server-side only

---

## Claude's Discretion

- Submit button styling and hover effects
- Glassmorphism card blur intensity and opacity
- Success checkmark icon choice
- HTML email template styling
- Field placeholder text and label styling
- Server Action vs Route Handler choice
- Exact error message wording

## Deferred Ideas

None — discussion stayed within phase scope
