"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@heroui/link";
import { usePagination } from "@/contexts/PaginationContext";
import { Pagination } from "@heroui/pagination";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import SpeechPlayer from "@/components/SpeechPlayer";
import { useSpeech } from "@/contexts/SpeechContext";
import { AnimatePresence, motion } from "framer-motion";

export const TwitterSvg = ({ theme }: any) => {
  return (
    <Link isExternal href="https://x.com/nerdbunnyai">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.2439 2.25H21.5519L14.3249 10.51L22.8269 21.75H16.1699L10.9559 14.933L4.98991 21.75H1.67991L9.40991 12.915L1.25391 2.25H8.07991L12.7929 8.481L18.2439 2.25ZM17.0829 19.77H18.9159L7.08391 4.126H5.11691L17.0829 19.77Z"
          fill={theme === "dark" ? "#9E9E9E" : "#2E2E2E"}
        />
      </svg>
    </Link>
  );
};
export const TiktokSvg = ({ theme }: any) => {
  return (
    <Link isExternal href="https://www.tiktok.com/@nerdbunnyofficial">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6002 5.82C15.9167 5.03953 15.5401 4.0374 15.5402 3H12.4502V15.4C12.4268 16.0712 12.1437 16.7071 11.6605 17.1735C11.1773 17.6399 10.5318 17.9004 9.86016 17.9C8.44016 17.9 7.26016 16.74 7.26016 15.3C7.26016 13.58 8.92016 12.29 10.6302 12.82V9.66C7.18016 9.2 4.16016 11.88 4.16016 15.3C4.16016 18.63 6.92016 21 9.85016 21C12.9902 21 15.5402 18.45 15.5402 15.3V9.01C16.7932 9.90985 18.2975 10.3926 19.8402 10.39V7.3C19.8402 7.3 17.9602 7.39 16.6002 5.82Z"
          fill={theme === "dark" ? "#9E9E9E" : "#2E2E2E"}
        />
      </svg>
    </Link>
  );
};
export const YoutubeSvg = ({ theme }: any) => {
  return (
    <Link isExternal href="#">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z"
          fill={theme === "dark" ? "#9E9E9E" : "#2E2E2E"}
        />
      </svg>
    </Link>
  );
};
export const TelegramSvg = ({ theme }: any) => {
  return (
    <Link isExternal href="http://t.me/nerdbunny1">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.7767 4.42997C20.0238 4.32596 20.2943 4.29008 20.5599 4.32608C20.8256 4.36208 21.0768 4.46863 21.2873 4.63465C21.4979 4.80067 21.6601 5.02008 21.757 5.27005C21.854 5.52002 21.8822 5.79141 21.8387 6.05597L19.5707 19.813C19.3507 21.14 17.8947 21.901 16.6777 21.24C15.6597 20.687 14.1477 19.835 12.7877 18.946C12.1077 18.501 10.0247 17.076 10.2807 16.062C10.5007 15.195 14.0007 11.937 16.0007 9.99997C16.7857 9.23897 16.4277 8.79997 15.5007 9.49997C13.1987 11.238 9.50265 13.881 8.28065 14.625C7.20265 15.281 6.64065 15.393 5.96865 15.281C4.74265 15.077 3.60565 14.761 2.67765 14.376C1.42365 13.856 1.48465 12.132 2.67665 11.63L19.7767 4.42997Z"
          fill={theme === "dark" ? "#9E9E9E" : "#2E2E2E"}
        />
      </svg>
    </Link>
  );
};
export const InstagramSvg = ({ theme }: any) => {
  return (
    <Link isExternal href="#">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0276 2C14.1526 2.003 14.7236 2.009 15.2166 2.023L15.4106 2.03C15.6346 2.038 15.8556 2.048 16.1226 2.06C17.1866 2.11 17.9126 2.278 18.5496 2.525C19.2096 2.779 19.7656 3.123 20.3216 3.678C20.8303 4.17773 21.2238 4.78247 21.4746 5.45C21.7216 6.087 21.8896 6.813 21.9396 7.878C21.9516 8.144 21.9616 8.365 21.9696 8.59L21.9756 8.784C21.9906 9.276 21.9966 9.847 21.9986 10.972L21.9996 11.718V13.028C22.002 13.7574 21.9944 14.4868 21.9766 15.216L21.9706 15.41C21.9626 15.635 21.9526 15.856 21.9406 16.122C21.8906 17.187 21.7206 17.912 21.4746 18.55C21.2238 19.2175 20.8303 19.8223 20.3216 20.322C19.8219 20.8307 19.2171 21.2242 18.5496 21.475C17.9126 21.722 17.1866 21.89 16.1226 21.94L15.4106 21.97L15.2166 21.976C14.7236 21.99 14.1526 21.997 13.0276 21.999L12.2816 22H10.9726C10.2429 22.0026 9.51312 21.9949 8.78359 21.977L8.58959 21.971C8.3522 21.962 8.11487 21.9517 7.87759 21.94C6.81359 21.89 6.08759 21.722 5.44959 21.475C4.78242 21.2241 4.17804 20.8306 3.67859 20.322C3.16954 19.8224 2.7757 19.2176 2.52459 18.55C2.27759 17.913 2.10959 17.187 2.05959 16.122L2.02959 15.41L2.02459 15.216C2.00616 14.4868 1.99782 13.7574 1.99959 13.028V10.972C1.99682 10.2426 2.00416 9.5132 2.02159 8.784L2.02859 8.59C2.03659 8.365 2.04659 8.144 2.05859 7.878C2.10859 6.813 2.27659 6.088 2.52359 5.45C2.77529 4.7822 3.16982 4.17744 3.67959 3.678C4.17875 3.16955 4.78278 2.77607 5.44959 2.525C6.08759 2.278 6.81259 2.11 7.87759 2.06C8.14359 2.048 8.36559 2.038 8.58959 2.03L8.78359 2.024C9.51278 2.00623 10.2422 1.99857 10.9716 2.001L13.0276 2ZM11.9996 7C10.6735 7 9.40174 7.52678 8.46406 8.46447C7.52638 9.40215 6.99959 10.6739 6.99959 12C6.99959 13.3261 7.52638 14.5979 8.46406 15.5355C9.40174 16.4732 10.6735 17 11.9996 17C13.3257 17 14.5974 16.4732 15.5351 15.5355C16.4728 14.5979 16.9996 13.3261 16.9996 12C16.9996 10.6739 16.4728 9.40215 15.5351 8.46447C14.5974 7.52678 13.3257 7 11.9996 7ZM11.9996 9C12.3936 8.99993 12.7837 9.07747 13.1477 9.22817C13.5117 9.37887 13.8424 9.5998 14.1211 9.87833C14.3997 10.1569 14.6207 10.4875 14.7715 10.8515C14.9224 11.2154 15 11.6055 15.0001 11.9995C15.0002 12.3935 14.9226 12.7836 14.7719 13.1476C14.6212 13.5116 14.4003 13.8423 14.1218 14.121C13.8432 14.3996 13.5126 14.6206 13.1486 14.7714C12.7847 14.9223 12.3946 14.9999 12.0006 15C11.2049 15 10.4419 14.6839 9.87927 14.1213C9.31666 13.5587 9.00059 12.7956 9.00059 12C9.00059 11.2044 9.31666 10.4413 9.87927 9.87868C10.4419 9.31607 11.2049 9 12.0006 9M17.2506 5.5C16.9191 5.5 16.6011 5.6317 16.3667 5.86612C16.1323 6.10054 16.0006 6.41848 16.0006 6.75C16.0006 7.08152 16.1323 7.39946 16.3667 7.63388C16.6011 7.8683 16.9191 8 17.2506 8C17.5821 8 17.9001 7.8683 18.1345 7.63388C18.3689 7.39946 18.5006 7.08152 18.5006 6.75C18.5006 6.41848 18.3689 6.10054 18.1345 5.86612C17.9001 5.6317 17.5821 5.5 17.2506 5.5Z"
          fill={theme === "dark" ? "#9E9E9E" : "#2E2E2E"}
        />
      </svg>
    </Link>
  );
};
const Footer = () => {
  const { theme } = useTheme();
  const { page, totalPage, setPage } = usePagination();
  const { speechUrl, showSpeech } = useSpeech();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <AnimatePresence>
        {showSpeech && speechUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:px-12 mb-4 overflow-hidden"
          >
            <SpeechPlayer audio_url={speechUrl} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-[80%] gap-4">
        <div className="flex flex-col justify-center items-center text-center mt-2 sm:mt-0">
          <span>Copyright © 2025 NerdBunny</span>
        </div>
        {pathname === "/" && (
          <div>
            <Pagination
              isCompact
              showControls
              showShadow
              initialPage={1}
              page={page}
              total={totalPage}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
        <div className="flex flex-row justify-center gap-2">
          <TelegramSvg theme={theme} />
          <TwitterSvg theme={theme} />
          <TiktokSvg theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
