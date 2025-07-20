import { useModelsStore } from "@/stores/models.store";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";
import { useCallback } from "react";

// ModelsStoreを簡単に使うためのカスタムフック
export const useModels = () => {
  const { models, setModels, addModel, clearModels } = useModelsStore();

  // 特定のIDでモデルを検索するヘルパー関数
  const findModelById = useCallback(
    (id: string) => {
      return models.find((model) => model.id === id);
    },
    [models]
  );

  // モデルを日付順に並べ替える
  const getSortedModels = useCallback(() => {
    return [...models].sort((a, b) => b.created - a.created);
  }, [models]);

  // モデルを追加し、IDが存在しない場合のみ追加する
  const addModelIfNotExists = useCallback(
    (model: OpenAiModel) => {
      if (!models.some((m) => m.id === model.id)) {
        addModel(model);
      }
    },
    [models, addModel]
  );

  return {
    models,
    setModels,
    addModel,
    clearModels,
    findModelById,
    getSortedModels,
    addModelIfNotExists,
  };
};
