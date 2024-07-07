import { useEffect, useState } from "react";

const getDeviceType = (userAgent: string) => {
  if (/Tablet|iPad/i.test(userAgent)) {
    return "Tablet";
  } else if (/Mobi|Android/i.test(userAgent)) {
    return "SP";
  }
  return "PC";
};

export const useDevice = () => {
  const [device, setDevice] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    type: getDeviceType(navigator.userAgent),
  });

  const handleResize = () => {
    setDevice({
      width: window.innerWidth,
      height: window.innerHeight,
      type: getDeviceType(navigator.userAgent),
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
};
