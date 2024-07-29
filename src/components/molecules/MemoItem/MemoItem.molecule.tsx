import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { CustomReactMarkdown } from "@/components/organisms/CustomReactMarkdown/CustomReactMarkdown.organism";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useDeleteMemo } from "@/hooks/api/useDeleteMemo.hook";
import { usePutMemo } from "@/hooks/api/usePutMemo.hook";
import { usePutMemoArchive } from "@/hooks/api/usePutMemoArchive.hook";
import { useGetMemo } from "@/hooks/api/useGetMemo.hook";
import { Icons } from "@/icons";

const IconSize = 22;

type Inputs = {
  content: string;
  title: string;
};

type Props = {
  content: string;
  title: string;
  id: number;
  archived: boolean;
  editIcon?: boolean;
  showIcon?: boolean;
  deleteIcon?: boolean;
};

export const MemoItem = ({
  content,
  title,
  id,
  archived,
  editIcon = true,
  showIcon = true,
  deleteIcon = true,
}: Props) => {
  const [apiPending, setApiPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { refetch } = useGetMemo();

  const memoMutate = usePutMemo();
  const archiveMutate = usePutMemoArchive();
  const deleteMutate = useDeleteMemo();

  const { register, setValue, watch } = useForm<Inputs>();

  useEffect(() => {
    setValue("content", content);
    setValue("title", title);
  }, [content, title, setValue]);

  useEffect(() => {
    if (contentRef.current) {
      if (isEditing || isShow) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.height = "0px";
      }
    }
  }, [isEditing, isShow]);

  const handleArchive = () => {
    setApiPending(true);
    archiveMutate(
      { archive: !archived, id },
      {
        onSuccess: (data) => {
          if (data.data.archived) {
            toast(textsConfig.TOAST.MEMO_ARCHIVE.SUCCESS);
          } else {
            toast(textsConfig.TOAST.MEMO_UNARCHIVE.SUCCESS);
          }
          refetch();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.MEMO_CREATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setValue("content", content);
    setValue("title", title);
    setIsEditing(false);
    setIsShow(false);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (
      e.target instanceof HTMLButtonElement &&
      (e.target.id === "delete-button" || e.target.id === "unarchive-button")
    ) {
      return;
    }
    if (isShow) return;
    setIsShow(true);
  };

  const handleDelete = () => {
    deleteMutate(
      { id },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.MEMO_DELETE.SUCCESS);
          refetch();
        },
      }
    );
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleShow = () => {
    setIsShow((prev) => !prev);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const { title, content } = watch();
    memoMutate(
      {
        content,
        title,
        id,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.MEMO_UPDATE.SUCCESS);
          refetch();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.MEMO_UPDATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
          setIsEditing(false);
          if (contentRef.current) {
            contentRef.current.style.height = "0px";
            contentRef.current.style.height = `auto`;
          }
        },
      }
    );
  };
  return (
    <li
      className={clsx(
        "relative z-0 min-h-[45px] px-4 py-2 rounded-3xl bg-white bg-opacity-90",
        isShow ? "cursor-default" : "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-2 min-h-[29px]">
        {isEditing ? (
          <FormInput
            inputClassName="min-w-0 border-none"
            placeholder="タイトル"
            value={watch("title")}
            wrapperClassName="w-full"
            {...register("title")}
          />
        ) : (
          <p className="w-full text-gray truncate">{title}</p>
        )}
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
          {editIcon && !archived ? (
            <Button onClick={isEditing ? handleCancel : handleEdit}>
              <Icons.Pencil
                color={colorConfig.success}
                width={IconSize}
                height={IconSize}
              />
            </Button>
          ) : (
            <Button id="unarchive-button" onClick={handleArchive}>
              <Icons.ArrowUturnLeft
                className="pointer-events-none"
                color={colorConfig.success}
                width={IconSize}
                height={IconSize}
              />
            </Button>
          )}
          {deleteIcon && !archived ? (
            <Button
              id="delete-button"
              disabled={apiPending}
              onClick={handleArchive}
            >
              <Icons.ArchiveBox
                className="pointer-events-none"
                color={colorConfig.error}
                width={IconSize}
                height={IconSize}
              />
            </Button>
          ) : (
            <Button id="delete-button" onClick={handleDelete}>
              <Icons.Trash
                className="pointer-events-none"
                color={colorConfig.error}
                width={IconSize}
                height={IconSize}
              />
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-hidden duration-150" ref={contentRef}>
        {isEditing ? (
          <>
            <FormTextarea
              textareaClassName="pt-[4px] border-none"
              placeholder="内容"
              value={watch("content")}
              wrapperClassName="pt-[6px]"
              {...register("content")}
            />
            <div className="flex justify-end gap-4 w-2/3 s:w-full mr-0 ml-auto pt-2">
              <Button
                className="!w-1/3 s:!w-1/2"
                onClick={handleCancel}
                type="reset"
                variant="cancel"
              >
                キャンセル
              </Button>
              <Button
                className="!w-1/3 s:!w-1/2"
                disabled={apiPending}
                onClick={handleSubmit}
                type="submit"
                variant={apiPending ? "disable" : "primary"}
              >
                更新
              </Button>
            </div>
          </>
        ) : (
          content && (
            <CustomReactMarkdown
              className="pt-2 whitespace-pre-wrap"
              markdown={content}
            />
          )
        )}
      </div>
    </li>
  );
};
