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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#051126] selection:bg-blue-brand/30">
        {children}
      </body>
    </html>
  );
}
