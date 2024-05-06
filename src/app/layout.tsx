import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Video and GIF Generator",
  description: "Generate custom videos and GIFs based on user input. Quick and easy video creation tool.",
  keywords: "video generator, GIF generator, custom videos, custom GIFs, user-generated content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} >{children}</body>
    </html>
  );
}
