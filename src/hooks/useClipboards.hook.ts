import { useClipboardsStore } from '@/stores/clipboards.store';

export const useClipboards = () => {
  const { 
    clipboards, 
    setClipboards, 
    addClipboard, 
    removeClipboard, 
    clearClipboards 
  } = useClipboardsStore();

  return {
    clipboards,
    setClipboards,
    addClipboard,
    removeClipboard,
    clearClipboards,
  };
};
