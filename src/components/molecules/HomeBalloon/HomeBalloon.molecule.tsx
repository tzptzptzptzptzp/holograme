import { useEffect, useRef, useState } from "react";
import styles from "./HomeBalloon.module.scss";
import { Button } from "@/components/atoms/Button/Button.atom";
import { cn } from "@/utils/Cn.util";

type Props = {
  message: string;
};

export const HomeBalloon = ({ message }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (ref.current) {
      if (isShow) {
        const height = ref.current.scrollHeight;
        ref.current.style.height = height + "px";
      } else {
        ref.current.style.height = "26px";
      }
    }
  }, [isShow]);

  const handleClick = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <Button className={cn(styles.balloon)} hover={false} onClick={handleClick}>
      <div className={cn(styles.inner)}>
        <div className="flex overflow-hidden">
          <p className={cn("duration-300")} ref={ref}>
            {message}
          </p>
          {!isShow && <p>…</p>}
        </div>
      </div>
    </Button>
  );
};
