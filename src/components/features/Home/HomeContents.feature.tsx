import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";

export const HomeContents = () => {
  return (
    <div className="flex gap-3 w-full">
      <SearchForm />
      <SearchTypeSwitcher />
      <ClipboardPasteButton />
      <ClipboardCopyButton />
    </div>
  );
};
