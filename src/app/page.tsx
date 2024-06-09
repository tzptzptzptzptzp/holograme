import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { GlobalFrame } from "@/components/templates/GlobalFrame.template";

export default function Home() {
  return (
    <GlobalFrame>
      <SearchForm />
    </GlobalFrame>
  );
}
