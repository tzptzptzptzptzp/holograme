import { useEffect, useState } from "react";

type DeviceType = "PC" | "Tablet" | "SP" | "";

const getDeviceType = (userAgent: string): DeviceType => {
  if (/Tablet|iPad/i.test(userAgent)) {
    return "Tablet";
  } else if (/Mobi|Android/i.test(userAgent)) {
    return "SP";
  }
  return "PC";
};

export const useDevice = () => {
  const [device, setDevice] = useState<{
    width: number;
    height: number;
    type: DeviceType;
  }>({
    width: 0,
    height: 0,
    type: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setDevice({
          width: window.innerWidth,
          height: window.innerHeight,
          type: getDeviceType(navigator.userAgent),
        });
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return device;
};
