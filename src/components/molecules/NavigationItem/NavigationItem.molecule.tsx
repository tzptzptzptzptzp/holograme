import clsx from "clsx";
import { useRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { useDevice } from "@/hooks/useDevice.hook";
import { Icons } from "@/icons";
import { IconType } from "@/icons/icon.type";
import { SelectedContentState } from "@/recoil/atoms.recoil";
import { SelectedContentStateType } from "@/recoil/types.recoil";

type Props = {
  name: SelectedContentStateType;
};

const IconComponents: Record<SelectedContentStateType, React.FC<IconType>> = {
  home: Icons.Home,
  chat: Icons.Chat,
  clipboard: Icons.ClipBoard,
  memo: Icons.PencilSquare,
  history: Icons.ArchiveBox,
  setting: Icons.Config,
};

export const NavigationItem = ({ name }: Props) => {
  const [selectedContent, setSelectedContent] =
    useRecoilState(SelectedContentState);

  const IconComponent = IconComponents[name] || Icons.Home;

  const { type } = useDevice();
  const IconSize = type !== "SP" ? 32 : 28;

  const handleClick = (selectedContent: SelectedContentStateType) => {
    setSelectedContent(selectedContent);
  };
  return (
    <li>
      <Button
        className={clsx(
          "hover:opacity-100 transition-all duration-150",
          selectedContent !== name && "opacity-70"
        )}
        onClick={() => handleClick(name)}
      >
        <IconComponent
          className={clsx(
            "hover:stroke-2 transition-all duration-150",
            selectedContent === name && "stroke-2"
          )}
          color="white"
          width={IconSize}
          height={IconSize}
        />
      </Button>
    </li>
  );
};
