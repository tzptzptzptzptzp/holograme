import { Button } from "@/components/atoms/Button/Button.atom";
import { useSignOut } from "@/hooks/useSignOut.hook";
import clsx from "clsx";

type Props = {
  isHovered: boolean;
};

export const UserMenu = ({ isHovered }: Props) => {
  const { signOut } = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div
      className={clsx(
        "absolute right-full s:-right-4 pr-10 s:pr-0 duration-300",
        isHovered
          ? "u-centering-y s:-top-[2.35rem] opacity-1 pointer-events-auto"
          : "top-full opacity-0 pointer-events-none"
      )}
    >
      <ul className="min-w-[200px] px-3 py-2 rounded-lg bg-white shadow-sm">
        <li className="leading-normal">
          <Button onClick={handleSignOut}>ログアウト</Button>
        </li>
      </ul>
    </div>
  );
};
