import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import "./globals.css";

// Load fonts
const font = Outfit({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata
export const metadata = {
  title: "Your AI Study Buddy",
  description: "Simple AI Quiz and Note Application",
  openGraph: {
    title: "Learn With Franny",
    description:
      "Note AI assistance app to improve study habits and proven to increase grades.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    url: "https://learn-with-franny.vercel.app/",
    type: "website",
  },
};

// RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} ${geistSans.variable} ${geistMono.variable}`}
      >
        <UserProvider> {children}</UserProvider>
      </body>
    </html>
  );
}
