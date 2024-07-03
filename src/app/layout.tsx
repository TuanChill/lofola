import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_NAME } from "@/container/constrain";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
