import { create } from "zustand";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";

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

// Zustandストアの作成
export const useModelsStore = create<ModelsStore>()((set) => ({
  // 初期状態
  models: [defaultModel],

  // アクション
  setModels: (models) => set({ models }),

  addModel: (model) =>
    set((state) => ({
      models: [...state.models, model],
    })),

  clearModels: () => set({ models: [defaultModel] }),
}));
