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

  const { refetch } = useGetMemo();

  const mutate = useDeleteMemo();

  const { register, setValue, watch } = useForm<Inputs>();

  useEffect(() => {
    setValue("content", content);
    setValue("title", title);
  }, [content, title, setValue]);

  useEffect(() => {
    if (contentRef.current) {
      if (isShow) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.height = "0px";
      }
    }
  }, [isEditing, isShow]);

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
      e.target.id === "delete-button"
    )
      return;
    if (isShow) return;
    setIsShow(true);
  };

  const handleDelete = () => {
    mutate(
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
    console.log(title, content);
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
        {isEditing ? (
          <FormInput
            inputClassName="border-none"
            value={watch("title")}
            wrapperClassName=""
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
          {editIcon && (
            <Button onClick={handleEdit}>
              <Icons.Pencil
                color={colorConfig.success}
                width={IconSize}
                height={IconSize}
              />
            </Button>
          )}
          {deleteIcon && (
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
              value={watch("content")}
              wrapperClassName="pt-[6px]"
              {...register("content")}
            />
            <div className="flex justify-end gap-4 w-2/3 mr-0 ml-auto pt-2">
              <Button
                className="!w-1/3"
                onClick={handleCancel}
                type="reset"
                variant="cancel"
              >
                キャンセル
              </Button>
              <Button
                className="!w-1/3"
                // disabled={disabled}
                onClick={handleSubmit}
                type="submit"
                variant={false ? "disable" : "primary"}
              >
                更新
              </Button>
            </div>
          </>
        ) : (
          <CustomReactMarkdown className="pt-2" markdown={content} />
        )}
      </div>
    </li>
  );
};
