import {
  useSelectedContentStore,
  SelectedContentType,
} from "@/stores/selectedContent.store";
import { useCallback } from "react";

// 選択されたコンテンツを管理するカスタムフック
export const useSelectedContent = () => {
  const { selectedContent, setSelectedContent, resetSelectedContent } =
    useSelectedContentStore();

  // 特定のコンテンツが選択されているか確認するヘルパー
  const isSelected = useCallback(
    (content: SelectedContentType) => {
      return selectedContent === content;
    },
    [selectedContent]
  );

  // ホーム画面に戻るためのショートカット
  const goToHome = useCallback(() => {
    setSelectedContent("home");
  }, [setSelectedContent]);

  return {
    selectedContent,
    setSelectedContent,
    resetSelectedContent,
    isSelected,
    goToHome,
  };
};
