import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { CustomReactMarkdown } from "@/components/organisms/CustomReactMarkdown/CustomReactMarkdown.organism";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useDeleteClipboard } from "@/hooks/api/useDeleteClipboard.hook";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { Icons } from "@/icons";

const IconSize = 22;
const TEXT_LENGTH_LIMIT = 15;

type Props = {
  content: string;
  title: string;
  id: number;
  icon?: boolean;
  editIcon?: boolean;
  showIcon?: boolean;
  deleteIcon?: boolean;
};

export const MemoItem = ({
  content,
  title,
  id,
  icon = false,
  editIcon = true,
  showIcon = true,
  deleteIcon = true,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { refetch } = useGetClipboard();

  const mutate = useDeleteClipboard();

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isShow) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.height = "0px";
      }
    }
  }, [isShow]);

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        toast(`${textsConfig.TOAST.CLIPBOARD_DELETE.SUCCESS} - ${title}`);
        refetch();
      },
    });
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (isShow) return;
    setIsShow(true);
  };
  return (
    <li
      className={clsx(
        "px-4 py-2 rounded-3xl bg-white bg-opacity-90 relative z-0",
        isShow ? "cursor-default" : "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-1">
        {icon && (
          <Icons.ClipBoard
            className="stroke-2"
            color={colorConfig.primary}
            width={IconSize}
            height={IconSize}
          />
        )}
        <p className="w-full text-gray truncate">{title}</p>
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
          {editIcon && (
            <Icons.Pencil
              color={colorConfig.success}
              width={IconSize}
              height={IconSize}
            />
          )}
          {deleteIcon && (
            <Button onClick={handleDelete}>
              <Icons.Trash
                color={colorConfig.error}
                width={IconSize}
                height={IconSize}
              />
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-hidden duration-150" ref={contentRef}>
        <CustomReactMarkdown className="pt-2" markdown={content} />
      </div>
    </li>
  );
};
