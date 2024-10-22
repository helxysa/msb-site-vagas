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
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
