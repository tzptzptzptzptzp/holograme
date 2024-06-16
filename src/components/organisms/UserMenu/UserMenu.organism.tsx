import { Button } from "@/components/atoms/Button/Button.atom";
import { useSignOut } from "@/hooks/useSignOut.util";
import clsx from "clsx";

type Props = {
  isHovered: boolean;
};

export const UserMenu = ({ isHovered }: Props) => {
  const { signOut } = useSignOut();
  return (
    <div
      className={clsx(
        "absolute right-full pr-10 duration-300",
        isHovered
          ? "bottom-2 opacity-1 pointer-events-auto"
          : "-bottom-2 opacity-0 pointer-events-none"
      )}
    >
      <ul className="min-w-[200px] px-3 py-2 rounded-lg bg-white shadow-sm">
        <li>
          <Button onClick={signOut}>ログアウト</Button>
        </li>
      </ul>
    </div>
  );
};