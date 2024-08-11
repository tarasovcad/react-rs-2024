import Navbar from "@/components/Navbar";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RickAndMorty",
  description: "RickAndMorty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
