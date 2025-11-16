import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

// セッションストアの型定義
interface SessionStore {
  // 状態
  session: Session | null;
  authStatus: AuthStatus;

  // アクション
  setSession: (session: Session | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  clearSession: () => void;
}

// Zustandストアの作成
export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      // 初期状態
      session: null,
      authStatus: "loading",

      // アクション
      setSession: (session) =>
        set({
          session,
          authStatus: session ? "authenticated" : "unauthenticated",
        }),

      setAuthStatus: (authStatus) => set({ authStatus }),

      clearSession: () =>
        set({
          session: null,
          authStatus: "unauthenticated",
        }),
    }),
    {
      name: STORAGE_KEYS.SESSION,
      partialize: (state) => ({ session: state.session }),
    }
  )
);
