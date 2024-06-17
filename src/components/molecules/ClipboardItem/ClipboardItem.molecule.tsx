import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";
import { getMaskedText } from "@/utils/getMaskedText.util";

const IconSize = 22;

export const ClipboardItem = ({
  content,
  id,
}: {
  content: string;
  id: number;
}) => {
  return (
    <li className="flex items-center justify-between gap-2 px-4 py-2 rounded-full bg-white bg-opacity-90 relative z-0 cursor-default">
      <p className="truncate">{getMaskedText(content)}</p>
      <div className="flex items-center gap-3">
        <Button>
          <Icons.Eye
            color={colorConfig.text}
            width={IconSize}
            height={IconSize}
          />
        </Button>
        <Icons.Copy
          color={colorConfig.success}
          width={IconSize}
          height={IconSize}
        />
        <Button>
          <Icons.Trash
            color={colorConfig.error}
            width={IconSize}
            height={IconSize}
          />
        </Button>
      </div>
    </li>
  );
};
