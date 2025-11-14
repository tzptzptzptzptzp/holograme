import { useModelsStore } from "@/stores/models.store";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";
import { useCallback, useMemo } from "react";

// ModelsStoreを簡単に使うためのカスタムフック
export const useModels = () => {
  const { models, setModels, addModel, clearModels } = useModelsStore();

  // 有効なモデル（IDが空でないもの）のみをフィルタリング
  const validModels = useMemo(() => {
    return models.filter((model) => model.id !== "");
  }, [models]);

  // モデルを日付順（新しい順）に並び替え
  const sortedModels = useMemo(() => {
    return [...validModels].sort((a, b) => b.created - a.created);
  }, [validModels]);

  // 最新のモデルはソート済み配列の最初の要素
  const latestModel = useMemo(() => {
    return sortedModels.length > 0 ? sortedModels[0] : null;
  }, [sortedModels]);

  // 特定のIDでモデルを検索するヘルパー関数
  const findModelById = useCallback(
    (id: string) => {
      return sortedModels.find((model) => model.id === id);
    },
    [sortedModels]
  );

  // ソート済みモデルを返す
  const getSortedModels = useCallback(() => {
    return sortedModels;
  }, [sortedModels]);

  // モデルを追加し、IDが存在しない場合のみ追加する
  const addModelIfNotExists = useCallback(
    (model: OpenAiModel) => {
      if (!sortedModels.some((m) => m.id === model.id)) {
        addModel(model);
      }
    },
    [sortedModels, addModel]
  );

  return {
    models: sortedModels, // ソート済みの有効なモデル
    validModels, // フィルタリング済みだがソート前のモデル
    allModels: models, // すべてのモデル（デフォルト値含む）
    setModels,
    addModel,
    clearModels,
    findModelById,
    getSortedModels,
    latestModel,
    addModelIfNotExists,
  };
};
