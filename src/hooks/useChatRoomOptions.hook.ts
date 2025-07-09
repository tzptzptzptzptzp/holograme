import { useChatRoomOptionsStore, ChatRoomOptionType } from '@/stores/chatRoomOptions.store';
import { useCallback } from 'react';

// ChatRoomOptionsStoreを簡単に使うためのカスタムフック
export const useChatRoomOptions = () => {
  const { 
    options, 
    setOptions, 
    addOption, 
    updateOption, 
    removeOption, 
    resetOptions 
  } = useChatRoomOptionsStore();

  // IDでオプションを検索
  const findOptionById = useCallback((id: number) => {
    return options.find(opt => opt.id === id) || null;
  }, [options]);

  // 名前でオプションを検索
  const findOptionByName = useCallback((name: string) => {
    return options.find(opt => opt.name === name) || null;
  }, [options]);

  // オプションをソートして取得
  const getSortedOptions = useCallback(() => {
    return [...options].sort((a, b) => a.name.localeCompare(b.name));
  }, [options]);

  return {
    options,
    setOptions,
    addOption,
    updateOption,
    removeOption,
    resetOptions,
    findOptionById,
    findOptionByName,
    getSortedOptions,
  };
};
