import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";

const IconSize = 22;

type Props = {
  id: number;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number) => void;
  username: string;
};

export const WriterUserItem = ({ id, onClick, username }: Props) => {
  return (
    <li
      className="flex items-center justify-between gap-1 relative z-0 min-h-[45px] px-4 py-2 rounded-full bg-white bg-opacity-90 cursor-pointer"
      onClick={(e) => onClick(e, id)}
    >
      <Icons.UserCircle
        className="min-w-[22px] min-h-[22px] stroke-2"
        color={colorConfig.primary}
        width={IconSize}
        height={IconSize}
      />
      <p className="w-full text-gray truncate">{username}</p>
      <div className="flex items-center gap-3">
        <Icons.ArrowRightCircle
          color={colorConfig.secondary}
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
        <Button>
          <Icons.Config
            color={colorConfig.text}
            width={IconSize}
            height={IconSize}
          />
        </Button>
      </div>
    </li>
  );
};
