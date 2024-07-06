import Link from "next/link";
import clsx from "clsx";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";

export const FavoriteLinkButton = () => {
  return (
    <div className="flex items-center p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Link
        href={"/"}
        className={clsx(
          "flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 duration-150"
        )}
      >
        <Icons.Paste
          className="stroke-[2.5px] stroke-disableText hover:stroke-primary duration-150"
          color={colorConfig.disableText}
          width={20}
          height={20}
        />
      </Link>
    </div>
  );
};
