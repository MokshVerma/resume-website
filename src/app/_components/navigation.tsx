"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useScrollSpy } from "@/app/_hooks/use-scroll-spy";

const NAV_ITEMS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
] as const;

const SECTION_IDS = ["hero", "experience", "skills", "projects", "education"];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useScrollSpy(isHome ? SECTION_IDS : []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Body scroll lock when mobile overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(39, 39, 42, 0.5)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6 md:px-12 lg:px-24">
        {/* Left side: Name / Home anchor */}
        {isHome ? (
          <a
            href="#hero"
            className="text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            Moksh Verma
          </a>
        ) : (
          <Link
            href="/"
            className="text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            Moksh Verma
          </Link>
        )}

        {/* Right side: Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return isHome ? (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={`/${item.href}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-lg border border-accent/50 px-4 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="p-2 text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return isHome ? (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={`text-2xl font-bold transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              href={`/${item.href}`}
              onClick={closeMenu}
              className="text-2xl font-bold text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          onClick={closeMenu}
          className="mt-4 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-accent-hover"
        >
          Get in Touch
        </Link>
      </div>
    </nav>
  );
}
