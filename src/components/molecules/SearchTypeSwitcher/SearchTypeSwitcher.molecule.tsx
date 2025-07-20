import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/configs/color.config";
import { Icons } from "@/icons";
import { useSearchType } from "@/hooks/useSearchType.hook";
import { cn } from "@/utils/Cn.util";

export const SearchTypeSwitcher = () => {
  const { searchType, toggleSearchType } = useSearchType();

  const handleClick = () => {
    toggleSearchType();
  };
  return (
    <div className="flex items-center p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className={cn(
          "flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white duration-150",
          searchType !== "newTab" ? "bg-opacity-50" : ""
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
