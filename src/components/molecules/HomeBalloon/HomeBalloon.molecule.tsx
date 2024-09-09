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
        ref.current.style.overflow = "visible";
        ref.current.style.textOverflow = "clip";
        ref.current.style.whiteSpace = "normal";
        const height = ref.current.scrollHeight;
        ref.current.style.height = height + "px";
      } else {
        ref.current.style.height = "26px";
        setTimeout(() => {
          if (!ref.current) return;
          ref.current.style.overflow = "hidden";
          ref.current.style.textOverflow = "ellipsis";
          ref.current.style.whiteSpace = "nowrap";
        }, 250);
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
          <div className="contents s:block s:overflow-y-scroll s:max-h-[5.5rem]">
            <p
              className={cn(
                "min-h-[29px] pt-[1.3px] s:pt-[4px] duration-300 truncate"
              )}
              ref={ref}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </Button>
  );
};
