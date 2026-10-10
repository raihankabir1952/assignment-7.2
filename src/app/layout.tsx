import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Noto_Serif_Bengali({
    variable: "--font-geist-sans",
    subsets: ["latin", "bengali"],
});

const geistMono = Noto_Serif_Bengali({
    variable: "--font-geist-mono",
    subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
    title: "আজকের বাজার দর",
    description: "প্রতিদিনের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="bn"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
