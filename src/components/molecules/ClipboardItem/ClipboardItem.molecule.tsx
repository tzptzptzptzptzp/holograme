import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { Icons } from "@/icons";
import { getMaskedText } from "@/utils/getMaskedText.util";
import { getTrimmedText } from "@/utils/GetTrimmedText.util";

const IconSize = 22;
const TEXT_LENGTH_LIMIT = 15;

type Props = {
  content: string;
  id: number;
  icon?: boolean;
  showIcon?: boolean;
  copyIcon?: boolean;
  deleteIcon?: boolean;
};

export const ClipboardItem = ({
  content,
  id,
  icon = false,
  showIcon = true,
  copyIcon = true,
  deleteIcon = true,
}: Props) => {
  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).closest("button")) return;
    try {
      await navigator.clipboard.writeText(content).then(() => {
        toast(
          `${textsConfig.TOAST.CLIPBOARD_SAVE.SUCCESS} - ${
            content.length >= TEXT_LENGTH_LIMIT
              ? getTrimmedText(content, TEXT_LENGTH_LIMIT)
              : content
          }`
        );
      });
    } catch (err) {
      toast.error(textsConfig.TOAST.CLIPBOARD_SAVE.ERROR);
      console.error("Failed to write to clipboard: ", err);
    }
  };
  return (
    <li
      className="flex items-center justify-between gap-1 px-4 py-2 rounded-full bg-white bg-opacity-90 relative z-0 cursor-default"
      onClick={handleClick}
    >
      {icon && (
        <div>
          <Icons.ClipBoard
            className="stroke-2"
            color={colorConfig.primary}
            width={IconSize}
            height={IconSize}
          />
        </div>
      )}
      <p className="text-gray truncate">
        {isShow ? content : getMaskedText(content)}
      </p>
      <div className="flex items-center gap-3">
        {showIcon && (
          <Button onClick={handleShow}>
            {isShow ? (
              <Icons.EyeSlash
                color={colorConfig.error}
                width={IconSize}
                height={IconSize}
              />
            ) : (
              <Icons.Eye
                color={colorConfig.text}
                width={IconSize}
                height={IconSize}
              />
            )}
          </Button>
        )}
        {copyIcon && (
          <Icons.Copy
            color={colorConfig.success}
            width={IconSize}
            height={IconSize}
          />
        )}
        {deleteIcon && (
          <Button>
            <Icons.Trash
              color={colorConfig.error}
              width={IconSize}
              height={IconSize}
            />
          </Button>
        )}
      </div>
    </li>
  );
};
