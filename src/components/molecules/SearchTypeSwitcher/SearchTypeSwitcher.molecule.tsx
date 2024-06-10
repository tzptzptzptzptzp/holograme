import clsx from "clsx";
import { useRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";
import { SearchTypeState } from "@/recoil/atoms.recoil";

export const SearchTypeSwitcher = () => {
  const [searchType, setSearchType] = useRecoilState(SearchTypeState);

  const handleClick = () => {
    setSearchType((prev) => (prev === "newTab" ? "currentTab" : "newTab"));
  };
  return (
    <div className="u-shadow flex items-center p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className={clsx(
          "flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white duration-150",
          searchType !== "newTab" && "bg-opacity-50"
        )}
        onClick={handleClick}
      >
        <Icons.NewTab
          className="stroke-[2.5px] duration-150"
          color={
            searchType === "newTab"
              ? colorConfig.primary
              : colorConfig.disableText
          }
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};
