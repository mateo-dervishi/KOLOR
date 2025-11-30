import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/effects/CustomCursor";

export const metadata: Metadata = {
  title: "KOLOR | No Kolor Just Reality",
  description: "I thought life was full of kolor. What's life without kolor? No kolor just reality. Premium streetwear designed to add kolor to your world.",
  keywords: ["KOLOR", "streetwear", "fashion", "clothing", "hoodie", "premium"],
  authors: [{ name: "KOLOR" }],
  openGraph: {
    title: "KOLOR | No Kolor Just Reality",
    description: "I thought life was full of kolor. Premium streetwear designed to add kolor to your world.",
    type: "website",
    locale: "en_US",
    siteName: "KOLOR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KOLOR | No Kolor Just Reality",
    description: "I thought life was full of kolor. Premium streetwear designed to add kolor to your world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white custom-cursor-active">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
