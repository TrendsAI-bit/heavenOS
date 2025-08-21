import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heaven OS - Boot to clouds. Work in pixels.",
  description: "A retro pixel operating system experience. Boot to the clouds and work in beautiful pixels with Heaven OS.",
  keywords: "retro, pixel, OS, operating system, vintage, 8-bit",
  authors: [{ name: "Heaven OS Team" }],
  robots: "index, follow",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.png" type="image/png" />
        <link rel="preload" href="/fonts/press-start-2p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/vt323.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-pixel antialiased">
        {children}
      </body>
    </html>
  );
}