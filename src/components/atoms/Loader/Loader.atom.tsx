import { cn } from "@/utils/Cn.util";
import styles from "./Loader.module.scss";

type Props = {
  centering?: boolean;
  color?: "white" | "primary" | "secondary";
  no?: number;
};

export const Loader = ({
  centering = true,
  color = "white",
  no = 1,
}: Props) => {
  const loaderClass = `loader${no}`;
  if (centering)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className={cn(styles[color], styles[loaderClass])}></div>
      </div>
    );
  return <div className={cn(styles[color], styles[loaderClass])}></div>;
};
