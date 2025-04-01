import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Corrected: Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// ✅ Metadata (excluding viewport)
export const metadata: Metadata = {
  title: "Smart SGPA Calculator",
  description: "SGPA Calculator website allows students to easily calculate their Semester Grade Point Average (SGPA) by simply uploading their report card image. The tool automatically extracts relevant data and computes the SGPA with accuracy, saving time and effort. It’s a quick and hassle-free solution for students who want to track their academic progress. Just upload, and let the calculator do the rest!",
  metadataBase: new URL("https://smart-sgpa-calculator.vercel.app/"), // ✅ Replace with your actual domain
  icons: "/favicon.ico",
  keywords: ["SGPA calculator", "academic progress", "grade point average", "student report card", "SGPA calculator tool", "semester grade calculation", "student performance tracker", "automated SGPA calculation", "easy SGPA calculation", "academic tracker", "report card upload", "student GPA", "education tool", "student self-assessment", "academic analysis"]
  ,
  authors: [{ name: "Deepak D Nayak", url: "https://smart-sgpa-calculator.vercel.app//" }],
  openGraph: {
    title: "Smart SGPA Calculator",
    description: "SGPA Calculator website allows students to easily calculate their Semester Grade Point Average (SGPA) by simply uploading their report card image. The tool automatically extracts relevant data and computes the SGPA with accuracy, saving time and effort. It’s a quick and hassle-free solution for students who want to track their academic progress. Just upload, and let the calculator do the rest!",
    url: "https://smart-sgpa-calculator.vercel.app/",
    siteName: "Smart SGPA Calculator",
    images: [
      {
        url: "/logo.png", // ✅ Ensure this image exists in public/
        width: 1200,
        height: 630,
        alt: "Smart SGPA Calculator Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart SGPA Calculator",
    description: "SGPA Calculator website allows students to easily calculate their Semester Grade Point Average (SGPA) by simply uploading their report card image. The tool automatically extracts relevant data and computes the SGPA with accuracy, saving time and effort. It’s a quick and hassle-free solution for students who want to track their academic progress. Just upload, and let the calculator do the rest!",
    images: ["/logo.png"], // ✅ Ensure this image exists in public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
