import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { GlobalFrame } from "@/components/templates/GlobalFrame.template";

export default function Home() {
  return (
    <GlobalFrame>
      <main className="flex flex-col items-center justify-center w-full h-full">
        <SearchForm />
      </main>
    </GlobalFrame>
  );
}
