import { Button } from "@/components/atoms/Button/Button.atom";
import { ItemBase } from "@/components/atoms/ItemBase/ItemBase.atom";
import { colorConfig } from "@/config/color.config";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";

const IconSize = 22;

type Props = {
  id: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  username: string;
};

export const WriterUserItem = ({ id, onClick, username }: Props) => {
  const { handleOpen } = useModal();
  const { setFindWriter } = useWriter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e, id);
  };
  const handleDelete = () => {
    handleOpen("deleteWriter");
    setFindWriter(id);
  };
  const handleEdit = () => {
    handleOpen("editWriter");
    setFindWriter(id);
  };
  return (
    <ItemBase
      className="flex items-center justify-between gap-1 relative z-0 min-h-[45px] px-4 py-2 rounded-full bg-white bg-opacity-90 cursor-pointer"
      onClick={handleClick}
    >
      <Icons.UserCircle
        className="min-w-[22px] min-h-[22px] stroke-2"
        color={colorConfig.primary}
        width={IconSize}
        height={IconSize}
      />
      <p className="w-full text-gray text-left truncate">{username}</p>
      <div className="flex items-center gap-3">
        <Icons.ArrowRightCircle
          color={colorConfig.secondary}
          width={IconSize}
          height={IconSize}
        />
        <Button id={`exclude${GenerateRandomID()}`} onClick={handleDelete}>
          <Icons.Trash
            color={colorConfig.error}
            width={IconSize}
            height={IconSize}
          />
        </Button>
        <Button id={`exclude${GenerateRandomID()}`} onClick={handleEdit}>
          <Icons.Config
            color={colorConfig.text}
            width={IconSize}
            height={IconSize}
          />
        </Button>
      </div>
    </ItemBase>
  );
};
