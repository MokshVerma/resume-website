import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-hero font-bold leading-hero text-foreground">404</h1>
      <p className="mt-4 text-body text-muted">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-accent-hover"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </section>
  );
}
