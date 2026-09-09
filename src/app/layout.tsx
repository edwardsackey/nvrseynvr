import type { Metadata } from "next";
import { Inria_Serif, Pirata_One } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { ToastViewport } from "@/components/ui/ToastViewport";

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-inria",
  display: "swap",
});

const pirata = Pirata_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pirata",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "nvrsëynvr",
    template: "%s | nvrsëynvr",
  },
  description:
    "nvrsëynvr — built for the ones who never gave up. Streetwear designed in Accra, Ghana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inria.variable} ${pirata.variable} bg-white font-serif text-black antialiased`}
      >
        {/* Without scripting the reveal animations never run, so make sure the
            content is simply visible rather than stuck at opacity zero. */}
        <noscript>
          <style>{`.reveal,.reveal-group>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>
          {children}
          <ToastViewport />
        </Providers>
      </body>
    </html>
  );
}
