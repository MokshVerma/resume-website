"use client";

import { useState, type FormEvent } from "react";
import type { ContactFormData } from "@/lib/contact-schema";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
    const payload: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  function handleReset() {
    setStatus("idle");
    setFieldErrors({});
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-16 md:py-24">
      <h1 className="text-hero font-bold leading-hero text-foreground mb-4">
        Get in Touch
      </h1>
      <p className="text-body leading-body text-muted mb-8 md:mb-12">
        Have a question or want to work together? Drop me a message.
      </p>

      <div
        className="rounded-xl p-6 md:p-8"
        style={{
          background: "rgba(20, 20, 20, 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(39, 39, 42, 0.5)",
        }}
      >
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FiCheckCircle className="h-12 w-12 text-green-400 mb-4" />
            <h2 className="text-heading font-bold leading-heading text-foreground mb-2">
              Message sent!
            </h2>
            <p className="text-body leading-body text-muted mb-6">
              I&apos;ll get back to you soon.
            </p>
            <button
              onClick={handleReset}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            {status === "error" && (
              <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                Something went wrong. Please try again or email me directly at{" "}
                <a
                  href="mailto:mokshverma98@gmail.com"
                  className="underline hover:text-red-300"
                >
                  mokshverma98@gmail.com
                </a>
                .
              </div>
            )}

            {status === "rate-limited" && (
              <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                You&apos;ve already sent a message recently. Please try again in
                a minute.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-muted mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={status === "loading"}
                  placeholder="Your name"
                  className={`w-full rounded-lg px-4 py-3 text-body text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors disabled:opacity-50 ${
                    fieldErrors.name ? "ring-2 ring-red-400 border-red-400" : ""
                  }`}
                  style={{
                    backgroundColor: "#141414",
                    borderColor: fieldErrors.name ? undefined : "#27272a",
                    borderWidth: fieldErrors.name ? undefined : "1px",
                    borderStyle: "solid",
                  }}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {fieldErrors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "loading"}
                  placeholder="your@email.com"
                  className={`w-full rounded-lg px-4 py-3 text-body text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors disabled:opacity-50 ${
                    fieldErrors.email
                      ? "ring-2 ring-red-400 border-red-400"
                      : ""
                  }`}
                  style={{
                    backgroundColor: "#141414",
                    borderColor: fieldErrors.email ? undefined : "#27272a",
                    borderWidth: fieldErrors.email ? undefined : "1px",
                    borderStyle: "solid",
                  }}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-muted mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={status === "loading"}
                  rows={5}
                  placeholder="Your message..."
                  className={`w-full rounded-lg px-4 py-3 text-body text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-y disabled:opacity-50 ${
                    fieldErrors.message
                      ? "ring-2 ring-red-400 border-red-400"
                      : ""
                  }`}
                  style={{
                    backgroundColor: "#141414",
                    borderColor: fieldErrors.message ? undefined : "#27272a",
                    borderWidth: fieldErrors.message ? undefined : "1px",
                    borderStyle: "solid",
                  }}
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {fieldErrors.message[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
