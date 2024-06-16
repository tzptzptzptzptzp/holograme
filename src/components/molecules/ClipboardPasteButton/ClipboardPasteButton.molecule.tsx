import clsx from "clsx";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { usePostClipboard } from "@/hooks/api/usePostClipboard.hook";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { Icons } from "@/icons";

const TEXT_LENGTH_LIMIT = 15;

export const ClipboardPasteButton = () => {
  const { refetch } = useGetClipboard();
  const mutate = usePostClipboard();

  const handleClick = async () => {
    const text = await navigator.clipboard.readText();
    mutate(text, {
      onSuccess: () => {
        toast(
          `${textsConfig.TOAST.CLIPBOARD_PASTE.SUCCESS} - ${
            text.length >= TEXT_LENGTH_LIMIT
              ? `${text.slice(0, TEXT_LENGTH_LIMIT)}...`
              : text
          }`
        );
        refetch();
      },
      onError: (err) => {
        toast.error(textsConfig.TOAST.CLIPBOARD_PASTE.ERROR);
        console.error("Failed to read clipboard contents: ", err);
      },
    });
  };
  return (
    <div className="u-shadow flex items-center p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className={clsx(
          "flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 duration-150"
        )}
        onClick={handleClick}
      >
        <Icons.Paste
          className="stroke-[2.5px] stroke-disableText hover:stroke-primary duration-150"
          color={colorConfig.disableText}
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};
