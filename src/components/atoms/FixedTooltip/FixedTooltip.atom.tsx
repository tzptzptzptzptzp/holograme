import { ReactNode } from "react";

type FixedTooltipProps = {
  children: ReactNode;
  text: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export const FixedTooltip = ({
  children,
  text,
  position = "top-left",
}: FixedTooltipProps) => {
  // 位置に基づいたクラスの設定
  const positionClasses = {
    "top-left": "fixed top-4 left-4",
    "top-right": "fixed top-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "bottom-right": "fixed bottom-4 right-4",
  };

  return (
    <div className="relative group w-full min-w-0">
      {children}
      <div
        className={`${positionClasses[position]} px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap z-[9999]`}
      >
        {text}
      </div>
    </div>
  );
};
