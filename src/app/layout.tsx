import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InstaJob Dashboard",
  description: "AI Job Hunting Automation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white selection:bg-blue-400/30">
        {children}
      </body>
    </html>
  );
}
