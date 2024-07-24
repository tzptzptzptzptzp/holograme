import Link from "next/link";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";

const IconSize = 22;

type Props = {
  id: string;
  created: number;
};

export const ModelItem = ({ id, created }: Props) => {
  const formatCreated = new Date(created * 1000).setMinutes(0, 0, 0);

  const handleClick = () => {};
  return (
    <li
      className="flex items-center justify-between gap-1 w-full min-w-0 min-h-[45px] px-4 py-2 rounded-full bg-white bg-opacity-90 relative z-0 cursor-default"
      onClick={handleClick}
    >
      <Icons.Beaker
        className="min-w-[22px] min-h-[22px] stroke-2"
        color={colorConfig.primary}
        width={IconSize}
        height={IconSize}
      />
      <div className="flex items-center gap-4 w-full">
        <p className="text-gray truncate">
          {id} - {new Date(formatCreated).toLocaleString()}
        </p>
        <Link
          className="flex items-center gap-1 relative text-gray"
          href={"https://platform.openai.com/docs/models"}
          target="_blank"
        >
          openai.com/models
          <Icons.NewTab
            className="-translate-y-[0px] min-w-[14px] min-h-[14px] stroke-[2.5px]"
            color={colorConfig.gray}
            width={IconSize - 8}
            height={IconSize - 8}
          />
          <span className="absolute bottom-1 w-full border-b-[1.5px] opacity-70 border-gray"></span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Icons.ListBullet
          className="min-w-[22px] min-h-[22px]"
          color={colorConfig.text}
          width={IconSize + 2}
          height={IconSize + 2}
        />
      </div>
    </li>
  );
};
