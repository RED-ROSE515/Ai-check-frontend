import { useState, useEffect } from "react";

const useDeviceCheck = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    const isTablet = /iPad|Android/i.test(userAgent) && !isMobile;
    const isDesktop = !isMobile && !isTablet;

    if (isMobile) {
      setDeviceType("mobile");
    } else if (isTablet) {
      setDeviceType("tablet");
    } else if (isDesktop) {
      setDeviceType("desktop");
    }
  }, []);

  return deviceType;
};

export default useDeviceCheck;
