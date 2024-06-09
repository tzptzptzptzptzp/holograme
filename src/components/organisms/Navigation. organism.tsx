import { Icons } from "@/icons";
import { Button } from "../atoms/Button/Button.atom";

const IconSize = 32;

export const Navigation = () => {
  return (
    <nav className="u-shadow relative z-30 h-full w-20 bg-red-300">
      <ul className="flex flex-col gap-8 items-center justify-center h-full">
        <li>
          <Button>
            <Icons.Home color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
        <li>
          <Button>
            <Icons.Chat color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
        <li>
          <Button>
            <Icons.ClipBoard color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
        <li>
          <Button>
            <Icons.ArchiveBox
              color="white"
              width={IconSize}
              height={IconSize}
            />
          </Button>
        </li>
        <li>
          <Button>
            <Icons.Config color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
      </ul>
    </nav>
  );
};
