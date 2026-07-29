import type { Metadata } from "next";
import "@/globals.css";
import Providers from "./providers";
import { fraunces } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "SosrG Studios",
  description: "Cultivating the most prestigious sanctuary for Indian Visual & Performing Creators.",
  icons: {
    icon: "/sosrg.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fraunces.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
