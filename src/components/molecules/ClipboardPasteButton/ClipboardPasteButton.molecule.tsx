import clsx from "clsx";
import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";
import { ClipboardMockData } from "@/mock/Clipboard.mock";
import { toast } from "react-toastify";
import { textsConfig } from "@/config/texts.config";

const TEXT_LENGTH_LIMIT = 15;

export const ClipboardPasteButton = () => {
  const handleClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const req = {
        text,
        date: Number(new Date()),
      };
      ClipboardMockData.push(req);
      toast(
        `${textsConfig.TOAST.CLIPBOARD_PASTE.SUCCESS} - ${
          text.length >= TEXT_LENGTH_LIMIT
            ? `${text.slice(0, TEXT_LENGTH_LIMIT)}...`
            : text
        }`
      );
    } catch (err) {
      toast.error(textsConfig.TOAST.CLIPBOARD_PASTE.ERROR);
      console.error("Failed to read clipboard contents: ", err);
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
