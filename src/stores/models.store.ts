import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";
import { STORAGE_KEYS } from "@/configs/storage.config";

// デフォルト値
const defaultModel: OpenAiModel = {
  id: "",
  object: "",
  created: 0,
  owned_by: "",
};

// ストアの型定義
interface ModelsStore {
  // 状態
  models: OpenAiModel[];

  // アクション
  setModels: (models: OpenAiModel[]) => void;
  addModel: (model: OpenAiModel) => void;
  clearModels: () => void;
}

// Zustandストアの作成（永続化対応）
export const useModelsStore = create<ModelsStore>()(
  persist(
    (set) => ({
      // 初期状態
      models: [defaultModel],

      // アクション
      setModels: (models) => set({ models }),

      addModel: (model) =>
        set((state) => ({
          models: [...state.models, model],
        })),

      clearModels: () => set({ models: [defaultModel] }),
    }),
    {
      name: STORAGE_KEYS.MODELS,
      // LocalStorageから読み込む際のバリデーション
      partialize: (state) => ({ models: state.models }),
      onRehydrateStorage: () => (state) => {
        // 読み込まれたstateのmodelsが配列でない場合はデフォルト値で初期化
        if (state && !Array.isArray(state.models)) {
          state.models = [defaultModel];
        }
      },
    }
  )
);
