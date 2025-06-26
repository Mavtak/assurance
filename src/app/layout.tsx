import type { Metadata } from "next";
import "./globals.css";
import Body from './layout.Body'

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}
