import { colorConfig } from "@/config/color.config";
import { IconType } from "../icon.type";

export const ChevronUp = ({
  className,
  color = colorConfig.text,
  width = 24,
  height = 24,
}: IconType) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};
