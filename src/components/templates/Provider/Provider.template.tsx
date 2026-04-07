"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  // QueryClientを一度だけ作成し、再レンダリング時も保持
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // ネットワークエラー時の再取得を抑制して初回表示を高速化
            staleTime: 60 * 1000, // 1分
            retry: 1, // リトライを1回に制限
            refetchOnWindowFocus: false, // ウィンドウフォーカス時の再取得を無効化
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
