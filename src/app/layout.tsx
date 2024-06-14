import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/templates/Provider/Provider.template";
import { textsConfig } from "@/config/texts.config";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: textsConfig.META.TITLE,
  description: textsConfig.META.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
