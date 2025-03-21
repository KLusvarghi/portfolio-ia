import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Portifólio A-",
  description: "Portifólio de projetos de desenvolvimento ",
};

const fontMontSerat = Montserrat({
  subsets: ["latin"],
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${fontMontSerat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
