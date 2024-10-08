import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ItemBase } from "@/components/atoms/ItemBase/ItemBase.atom";
import { colorConfig } from "@/config/color.config";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";

const IconSize = 22;
const DATE_TO_DISPLAY_OF_NEW = 7;

type Props = {
  id: string;
  created: number;
};

export const ModelItem = ({ id, created }: Props) => {
  const [isNew, setIsNew] = useState(false);

  const { handleOpen } = useModal();

  useEffect(() => {
    const now = new Date().getTime();
    const oneWeekInMillis = DATE_TO_DISPLAY_OF_NEW * 24 * 60 * 60 * 1000;
    if (now - created * 1000 < oneWeekInMillis) {
      setIsNew(true);
    }
  }, [created]);
  return (
    <ItemBase>
      <Icons.Beaker
        className="min-w-[22px] min-h-[22px] stroke-2"
        color={colorConfig.primary}
        width={IconSize}
        height={IconSize}
      />
      <div className="flex items-center gap-4 s:gap-1 w-full min-w-0">
        <p className="s:max-w-[80%] text-gray truncate">
          {id}
          {created !== 0 && (
            <span className="s:hidden">
              {` - ${format(new Date(created * 1000), "yy/MM/dd - H:00")}`}
            </span>
          )}
          {isNew && (
            <span className="a-flash inline-block -translate-y-[2.5px] pl-1 text-red text-[12px]">
              new
            </span>
          )}
        </p>
        {created !== 0 && (
          <Link
            className="flex items-center gap-1 relative text-gray"
            href={"https://platform.openai.com/docs/models"}
            target="_blank"
          >
            <span className="s:hidden">openai.com/models</span>
            <Icons.NewTab
              className="-translate-y-[0px] min-w-[14px] min-h-[14px] stroke-[2.5px]"
              color={colorConfig.gray}
              width={IconSize - 8}
              height={IconSize - 8}
            />
            <span className="s:hidden absolute bottom-1 w-full border-b-[1.5px] opacity-70 border-gray"></span>
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={() => handleOpen("modelsList")}>
          <Icons.ListBullet
            className="min-w-[22px] min-h-[22px]"
            color={colorConfig.text}
            width={IconSize + 2}
            height={IconSize + 2}
          />
        </Button>
      </div>
    </ItemBase>
  );
};
