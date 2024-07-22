import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { Icons } from "@/icons";
import { GetMaskedText } from "@/utils/GetMaskedText.util";
import { getTrimmedText } from "@/utils/GetTrimmedText.util";
import { useDeleteClipboard } from "@/hooks/api/useDeleteClipboard.hook";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";

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
      className="flex items-center justify-between gap-1 w-full min-w-0 px-4 py-2 rounded-full bg-white bg-opacity-90 relative z-0 cursor-default"
      onClick={handleClick}
    >
      {icon && (
        <Icons.ClipBoard
          className="min-w-[22px] min-h-[22px] stroke-2"
          color={colorConfig.primary}
          width={IconSize}
          height={IconSize}
        />
      )}
      <p className="w-full text-gray truncate">
        {content === ""
          ? "まだ何も受け取っていません…"
          : isShow
          ? content
          : GetMaskedText(content)}
      </p>
      <div className="flex items-center gap-3">
        {showIcon && (
          <Button onClick={handleShow}>
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
          <Button onClick={handleDelete}>
            <Icons.Trash
              className="min-w-[22px] min-h-[22px]"
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
