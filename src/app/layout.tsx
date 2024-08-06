import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Provider } from "@/components/templates/Provider/Provider.template";
import { textsConfig } from "@/config/texts.config";
import { cn } from "@/utils/cn.util";

import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";

const font = M_PLUS_Rounded_1c({ weight: ["500", "700"], subsets: ["latin"] });

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
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={cn(font.className, "text-text")}>{children}</body>
      </html>
    </Provider>
  );
}
