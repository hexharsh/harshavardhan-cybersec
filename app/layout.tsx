import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harshavardhan P | Security Analyst | VAPT Professional",
  description:
    "Security Analyst at Deutsche Bank specializing in Vulnerability Assessment & Penetration Testing. Web, API, Mobile & Network Security. CEH Trained. Bangalore, India.",
  keywords: [
    "Harshavardhan P",
    "Harshavardhan Paliviri",
    "Security Analyst",
    "Deutsche Bank",
    "Cybersecurity",
    "Penetration Testing",
    "VAPT",
    "CEH",
    "Web Security",
    "API Security",
    "Mobile Security",
    "Network Security",
    "OWASP",
    "Ethical Hacking",
    "Bangalore",
  ],
  authors: [{ name: "Harshavardhan P" }],
  creator: "Harshavardhan P",
  openGraph: {
    title: "Harshavardhan P | Security Analyst | VAPT",
    description: "Security Analyst @ Deutsche Bank | VAPT | CEH Trained | Bangalore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshavardhan P | Security Analyst | VAPT",
    description: "Security Analyst @ Deutsche Bank | VAPT | CEH Trained | Bangalore",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white antialiased scan-line-overlay">
        {children}
      </body>
    </html>
  );
}
