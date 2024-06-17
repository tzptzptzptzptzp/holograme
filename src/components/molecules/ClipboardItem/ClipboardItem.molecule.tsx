import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";
import { getMaskedText } from "@/utils/getMaskedText.util";
import { useState } from "react";

const IconSize = 22;

export const ClipboardItem = ({
  content,
  id,
}: {
  content: string;
  id: number;
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <li className="flex items-center justify-between gap-2 px-4 py-2 rounded-full bg-white bg-opacity-90 relative z-0 cursor-default">
      <p className="truncate">{isShow ? content : getMaskedText(content)}</p>
      <div className="flex items-center gap-3">
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
