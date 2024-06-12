import clsx from "clsx";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";
import { ClipboardMockData } from "@/mock/Clipboard.mock";
import { textsConfig } from "@/config/texts.config";

const TEXT_LENGTH_LIMIT = 15;

export const ClipboardCopyButton = () => {
  const handleClick = async () => {
    try {
      if (ClipboardMockData.length > 0) {
        const lastItem = ClipboardMockData[ClipboardMockData.length - 1];
        const textToCopy = lastItem.text;
        await navigator.clipboard.writeText(textToCopy).then(() => {
          toast(
            `${textsConfig.TOAST.CLIPBOARD_SAVE} - ${
              textToCopy.length >= TEXT_LENGTH_LIMIT
                ? `${textToCopy.slice(0, TEXT_LENGTH_LIMIT)}...`
                : textToCopy
            }`
          );
        });
      } else {
        toast.error(textsConfig.TOAST.CLIPBOARD_SAVE_ERROR);
      }
    } catch (err) {
      toast.error(textsConfig.TOAST.CLIPBOARD_SAVE_ERROR);
      console.error("Failed to write to clipboard: ", err);
    }
  };

  return (
    <div className="u-shadow flex items-center p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className={clsx(
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
