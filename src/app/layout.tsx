import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Provider } from "@/components/templates/Provider/Provider.template";
import { textsConfig } from "@/configs/texts.config";
import { cn } from "@/utils/Cn.util";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";

const font = M_PLUS_Rounded_1c({
  weight: ["500", "900"],
  subsets: ["latin"],
  display: "swap", // フォント読み込み高速化
  preload: true, // プリロード有効化
});

export const metadata: Metadata = {
  title: textsConfig.META.TITLE,
  description: textsConfig.META.DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="ja" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#FCA5A5" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
          />
        </head>
        <body className={cn(font.className, "text-text")}>{children}</body>
      </html>
    </Provider>
  );
}
