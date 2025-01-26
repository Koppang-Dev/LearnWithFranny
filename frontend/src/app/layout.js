import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Head from "next/head";

const font = Outfit({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Your AI Study Buddy",
  description: "Simple AI Quiz and Note Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Open Graph Metadata (for iMessage, Slack, WhatsApp, etc.) */}
        <meta property="og:title" content="Learn With Franny" />
        <meta
          property="og:description"
          content="Note AI assistance app to improve study habbits and proven to increase grades."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:url"
          content="https://learn-with-franny.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
      <UserProvider>
        <body className={font.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
