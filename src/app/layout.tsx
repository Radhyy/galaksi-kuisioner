import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galaksi — Kuisioner Layanan Digital",
  description: "Formulir kuisioner evaluasi kepuasan layanan Galaksi dengan desain minimalis dan fokus.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>

    </html>
  );
}


