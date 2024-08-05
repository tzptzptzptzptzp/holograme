import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ItemBase } from "@/components/atoms/ItemBase/ItemBase.atom";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useDeleteClipboard } from "@/hooks/api/useDeleteClipboard.hook";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { Icons } from "@/icons";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";
import { GetMaskedText } from "@/utils/GetMaskedText.util";
import { getTrimmedText } from "@/utils/GetTrimmedText.util";

const IconSize = 22;
const TEXT_LENGTH_LIMIT = 15;

type Props = {
  content: string;
  id: number;
  showIcon?: boolean;
  copyIcon?: boolean;
  deleteIcon?: boolean;
};

export const ClipboardItem = ({
  content,
  id,
  showIcon = true,
  copyIcon = true,
  deleteIcon = true,
}: Props) => {
  const [isShow, setIsShow] = useState(false);

  const { refetch } = useGetClipboard();

  const mutate = useDeleteClipboard();

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        toast(
          `${textsConfig.TOAST.CLIPBOARD_DELETE.SUCCESS} - ${
            content.length >= TEXT_LENGTH_LIMIT
              ? getTrimmedText(content, TEXT_LENGTH_LIMIT)
              : content
          }`
        );
        refetch();
      },
    });
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const closestButton = (e.target as HTMLElement).closest("button");
    if (closestButton && closestButton.id.startsWith("exclude")) return;

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
    <ItemBase onClick={handleClick}>
      <Icons.ClipBoard
        className="min-w-[22px] min-h-[22px] stroke-2"
        color={colorConfig.primary}
        width={IconSize}
        height={IconSize}
      />
      <p className="w-full text-gray text-left truncate">
        {content === ""
          ? "まだ何も受け取っていません…"
          : isShow
          ? content
          : GetMaskedText(content)}
      </p>
      <div className="flex items-center gap-3">
        {showIcon && (
          <Button id={`exclude${GenerateRandomID()}`} onClick={handleShow}>
            {isShow ? (
              <Icons.EyeSlash
                className="min-w-[22px] min-h-[22px]"
                color={colorConfig.error}
                width={IconSize}
                height={IconSize}
              />
            ) : (
              <Icons.Eye
                className="min-w-[22px] min-h-[22px]"
                color={colorConfig.text}
                width={IconSize}
                height={IconSize}
              />
            )}
          </Button>
        )}
        {copyIcon && (
          <Icons.Copy
            className="min-w-[22px] min-h-[22px]"
            color={colorConfig.success}
            width={IconSize}
            height={IconSize}
          />
        )}
        {deleteIcon && (
          <Button id={`exclude${GenerateRandomID()}`} onClick={handleDelete}>
            <Icons.Trash
              className="min-w-[22px] min-h-[22px]"
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
