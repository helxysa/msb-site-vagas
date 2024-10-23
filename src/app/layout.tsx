import type { Metadata } from "next";
import "./globals.css";
import Nav from "./componentes/Nav/Nav";

export const metadata: Metadata = {
  title: "MSB",
  description: "MSB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100"
      data-new-gr-c-s-check-loaded="14.1087.0"
        data-gr-ext-installed=""
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
