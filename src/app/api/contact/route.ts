import { type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit store
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute in ms

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

function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [ip, timestamp] of rateLimitMap) {
    if (now - timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}

function buildEmailHtml(
  name: string,
  email: string,
  message: string,
): string {
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

export async function POST(request: NextRequest) {
  try {
    // Step 1: Cleanup stale entries + Rate limit check
    cleanupRateLimitMap();
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return Response.json(
        {
          error: "rate_limited",
          message:
            "You've already sent a message recently. Please try again in a minute.",
        },
        { status: 429 },
      );
    }

    // Step 2: Parse and validate request body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "validation_error",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Step 3: Send email via Resend
    const { name, email, message } = result.data;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mokshverma98@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: buildEmailHtml(name, email, message),
    });

    if (error) {
      return Response.json(
        {
          error: "send_failed",
          message: "Something went wrong. Please try again.",
        },
        { status: 500 },
      );
    }

    // Step 4: Record successful submission for rate limiting + respond
    rateLimitMap.set(ip, Date.now());

    return Response.json({ success: true });
  } catch {
    return Response.json(
      {
        error: "send_failed",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
