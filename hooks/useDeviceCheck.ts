import { useState, useEffect } from "react";

const useDeviceCheck = () => {
  const [deviceType, setDeviceType] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const _isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    const isTablet = /iPad|Android/i.test(userAgent) && !isMobile;
    const isDesktop = !isMobile && !isTablet;

    if (_isMobile) {
      setDeviceType("mobile");
      setIsMobile(true);
    } else if (isTablet) {
      setDeviceType("tablet");
    } else if (isDesktop) {
      setDeviceType("desktop");
    }
  }, []);

  return { deviceType, isMobile };
};

export default useDeviceCheck;
