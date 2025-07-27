import { Button } from "@/components/atoms/Button/Button.atom";
import { textsConfig } from "@/configs/texts.config";
import { useSignOut } from "@/hooks/auth/useSignOut.hook";
import { cn } from "@/utils/Cn.util";

type Props = {
  isActive: boolean;
};

export const UserMenu = ({ isActive }: Props) => {
  const { signOut } = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div
      className={cn(
        "absolute right-full s:-top-14 s:-translate-y-1/2 pr-10 s:pr-0 duration-300",
        isActive
          ? "top-1/2 -translate-y-1/2 s:-right-6 opacity-1 pointer-events-auto"
          : "top-full s:-right-24 opacity-0 pointer-events-none"
      )}
    >
      <ul className="min-w-[200px] px-3 py-2 rounded-lg bg-white shadow-sm">
        <li className="leading-normal">
          <Button onClick={handleSignOut}>{textsConfig.BUTTON.LOGOUT}</Button>
        </li>
      </ul>
    </div>
  );
};
