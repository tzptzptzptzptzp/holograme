import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";

export const HomeContents = () => {
  return (
    <div className="flex gap-3 w-full">
      <SearchForm />
      <SearchTypeSwitcher />
    </div>
  );
};
