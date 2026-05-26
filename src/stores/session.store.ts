import { Session } from "next-auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

interface SessionStore {
  session: Session | null;
  authStatus: AuthStatus;

  setSession: (session: Session | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      authStatus: "loading",

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
