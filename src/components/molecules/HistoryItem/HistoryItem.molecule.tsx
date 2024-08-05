import { Button } from "@/components/atoms/Button/Button.atom";
import { ItemBase } from "@/components/atoms/ItemBase/ItemBase.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";

const IconSize = 22;

type Props = {
  content: string;
  deleteIcon?: boolean;
  icon?: boolean;
  showIcon?: boolean;
  newTabIcon?: boolean;
  onDelete?: () => void;
};

export const HistoryItem = ({
  content,
  icon = true,
  newTabIcon = true,
  deleteIcon = true,
  onDelete,
}: Props) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    content
  )}`;

  const OpenIsCurrentTab = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const closestButton = (e.target as HTMLElement).closest("button");
    if (closestButton && closestButton.id.startsWith("exclude")) return;

    window.location.href = googleSearchUrl;
  };

  const OpenIsNewTab = async () => {
    window.open(googleSearchUrl, "_blank");
  };
  return (
    <ItemBase onClick={OpenIsCurrentTab}>
      {icon && (
        <Icons.Search
          className="min-w-[22px] min-h-[22px] stroke-2"
          color={colorConfig.primary}
          width={IconSize}
          height={IconSize}
        />
      )}
      <p className="w-full text-gray text-left truncate">{content}</p>
      <div className="flex items-center gap-3">
        {newTabIcon && (
          <Button id={`exclude${GenerateRandomID()}`} onClick={OpenIsNewTab}>
            <Icons.NewTab
              color={colorConfig.success}
              width={IconSize}
              height={IconSize}
            />
          </Button>
        )}
        {deleteIcon && (
          <Button id={`exclude${GenerateRandomID()}`} onClick={onDelete}>
            <Icons.Trash
              color={colorConfig.error}
              width={IconSize}
              height={IconSize}
            />
          </Button>
        )}
      </div>
    </ItemBase>
  );
};
