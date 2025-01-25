import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

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
      <UserProvider>
        <body className={font.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
