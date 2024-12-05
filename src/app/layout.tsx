import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import Providers from "./Providers";
import Script from "next/script";
import { Anton } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Hyperion",
  description: "IT and Software Solutions company based in London.",
  metadataBase: new URL("https://www.smarthyperion.com"),
};

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${GeistSans.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
          sizes="180x180"
        />
        <meta property="og:title" content={metadata.title as string} />
        <meta property="og:description" content={metadata.description as string} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.smarthyperion.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title as string} />
        <meta name="twitter:description" content={metadata.description as string} />
        {/* <meta name="twitter:image" content="URL of the image" />
        <meta name="twitter:url" content="URL of the shared link" />
        <meta name="twitter:site" content="Twitter handle of the website" /> */}
        <meta
          name="twitter:creator"
          content="Twitter handle of the content creator"
        />
      </head>
      <body>
        <Providers>{children}</Providers>

        <Script
          data-cfasync="false"
          type="text/javascript"
          src="https://cdn.seoplatform.io/injector.js?websiteId=22849"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
