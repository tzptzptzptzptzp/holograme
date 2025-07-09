import { useEffect, useState } from "react";

type DeviceType = "PC" | "SP" | "";

const getDeviceTypeByWidth = (width: number): DeviceType => {
  if (width <= 767) {
    return "SP";
  }
  return "PC";
};

export const useDevice = () => {
  const [device, setDevice] = useState<{
    width: number;
    height: number;
    type: DeviceType;
    isPc: boolean;
    isSp: boolean;
  }>({
    width: 0,
    height: 0,
    type: "",
    isPc: false,
    isSp: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const type = getDeviceTypeByWidth(width);

        setDevice({
          width,
          height,
          type,
          isPc: type === "PC",
          isSp: type === "SP",
        });
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return device;
};
