import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Moksh Verma",
  description: "Get in touch with Moksh Verma - Backend Engineer",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
