import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Provider } from "@/components/templates/Provider/Provider.template";
import { textsConfig } from "@/configs/texts.config";
import { cn } from "@/utils/Cn.util";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";

const font = M_PLUS_Rounded_1c({ weight: ["500", "900"], subsets: ["latin"] });

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
      <html lang="ja">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={cn(font.className, "text-text")}>{children}</body>
      </html>
    </Provider>
  );
}
