import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Moksh Verma.",
  openGraph: {
    title: "Contact | Moksh Verma",
    description: "Get in touch with Moksh Verma.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
