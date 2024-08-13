import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { Icons } from "@/icons";
import { cn } from "@/utils/Cn.util";

const TEXT_LENGTH_LIMIT = 15;

export const ClipboardCopyButton = () => {
  const { data } = useGetClipboard();

  const handleClick = async () => {
    if (!data || !data.length) {
      toast(textsConfig.TOAST.CLIPBOARD_SAVE.NO_ITEM);
      return;
    }
    try {
      if (data.length > 0) {
        const lastItem = data[0];
        const textToCopy = lastItem.content;
        await navigator.clipboard.writeText(textToCopy).then(() => {
          toast(
            `${textsConfig.TOAST.CLIPBOARD_SAVE.SUCCESS} - ${
              textToCopy.length >= TEXT_LENGTH_LIMIT
                ? `${textToCopy.slice(0, TEXT_LENGTH_LIMIT)}...`
                : textToCopy
            }`
          );
        });
      } else {
        toast.error(textsConfig.TOAST.CLIPBOARD_SAVE.ERROR);
      }
    } catch (err) {
      toast.error(textsConfig.TOAST.CLIPBOARD_SAVE.ERROR);
      console.error("Failed to write to clipboard: ", err);
    }
  };

  return (
    <div className="flex items-center p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className={cn(
          "flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 duration-150"
        )}
        onClick={handleClick}
      >
        <Icons.Copy
          className="stroke-[2.5px] stroke-disableText hover:stroke-primary duration-150"
          color={colorConfig.disableText}
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};
