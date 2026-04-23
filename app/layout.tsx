import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import ClientShell from "@/components/client-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATS Resume Matcher",
  description:
    "Upload your resume and paste a job description to get an AI-powered ATS match score.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiConfigured = !!process.env.GROQ_API_KEY;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <ClientShell apiConfigured={apiConfigured}>
          {children}
        </ClientShell>
        <Analytics />
      </body>
    </html>
  );
}
