import "./globals.css";
import "ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConnectWallet from "../Components/ConnectWallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Folks Router Widget Demo",
  description: "NextJS Dashboard Demo for Folks Router Widget",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ConnectWallet /> */}
        {children}
      </body>
    </html>
  );
}
