import React, { useTransition } from "react";
import { useTheme } from "next-themes";
import { FaPlus } from "react-icons/fa";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { useRouter } from "next/navigation";

export const TransferSVG = ({ color }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
    >
      <path
        d="M38.0451 22.5576L30.8351 29.7851L28.9801 27.9126L33.0401 23.8701H19.7051V21.2451H33.0401L28.9801 17.1851L30.8351 15.3301L38.0451 22.5576Z"
        fill={color}
      />
      <path
        d="M20.5974 8.33008L21.1224 8.85508V10.5001L20.5974 11.0251C18.7866 11.1083 17.0543 11.7887 15.6709 12.9601C14.2874 14.1314 13.3307 15.7278 12.9499 17.5001L12.7224 18.3926L11.8124 18.4801C10.4459 18.5593 9.15606 19.1379 8.18814 20.1058C7.22022 21.0737 6.64166 22.3635 6.56242 23.7301C6.54507 23.9689 6.54507 24.2087 6.56242 24.4476L4.40992 26.2501C4.08804 25.4244 3.92191 24.5463 3.91992 23.6601C3.98746 21.8017 4.69496 20.0236 5.9227 18.6269C7.15044 17.2301 8.82302 16.3004 10.6574 15.9951C11.2971 13.8341 12.6022 11.93 14.3868 10.5538C16.1715 9.17757 18.3448 8.39942 20.5974 8.33008Z"
        fill={color}
      />
      <path
        d="M24.5176 30.5376H11.1651L15.2251 34.5976L13.3701 36.4526L6.14258 29.2251L13.3701 21.9976L15.2251 23.8701L11.1651 27.9126H24.5176V30.5376Z"
        fill={color}
      />
      <path
        d="M29.1027 13.1076L27.1777 14.8576C26.5182 13.6828 25.5652 12.6993 24.4119 12.003C23.2586 11.3067 21.9444 10.9215 20.5977 10.8851V8.33008C22.2999 8.36067 23.9679 8.81315 25.4523 9.64695C26.9366 10.4807 28.1909 11.6698 29.1027 13.1076Z"
        fill={color}
      />
    </svg>
  );
};

export const CloudNatSVG = ({ color }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
    >
      <path
        d="M27.4414 19.5476C27.4414 20.0201 27.4414 20.4926 27.4414 21.0001C27.4414 21.5076 27.4414 21.9801 27.4414 22.4526H35.3164V19.5476H27.4414Z"
        fill={color}
      />
      <path
        d="M17.9215 10.3076H12.9165V13.2301H19.794C19.2682 12.1963 18.641 11.2173 17.9215 10.3076Z"
        fill={color}
      />
      <path
        d="M19.9163 28.77H13.9663V31.6925H17.9738C18.7114 30.7813 19.3617 29.8028 19.9163 28.77Z"
        fill={color}
      />
      <path
        d="M21.6665 21.0001C21.6935 20.5163 21.6935 20.0314 21.6665 19.5476H8.5415V22.4526H21.6665C21.6935 21.9688 21.6935 21.4839 21.6665 21.0001Z"
        fill={color}
      />
      <path
        d="M7.08893 21.8399C6.92209 21.8434 6.758 21.7971 6.61758 21.707C6.47716 21.6168 6.36677 21.4869 6.3005 21.3337C6.23423 21.1806 6.21508 21.0111 6.24549 20.8471C6.2759 20.683 6.35449 20.5317 6.47124 20.4124C6.58799 20.2932 6.7376 20.2115 6.90101 20.1776C7.06441 20.1437 7.2342 20.1593 7.38871 20.2224C7.54322 20.2854 7.67546 20.393 7.76855 20.5315C7.86165 20.67 7.91139 20.8331 7.91143 20.9999C7.91147 21.2197 7.82538 21.4308 7.67162 21.5878C7.51785 21.7448 7.30866 21.8354 7.08893 21.8399ZM7.08893 18.0774C6.51018 18.074 5.94343 18.2424 5.46053 18.5614C4.97763 18.8805 4.60033 19.3357 4.37644 19.8694C4.15256 20.4031 4.09218 20.9912 4.20296 21.5593C4.31375 22.1274 4.5907 22.6497 4.99871 23.0602C5.40672 23.4707 5.92743 23.7508 6.49481 23.8649C7.06219 23.9791 7.6507 23.9223 8.18574 23.7016C8.72078 23.4809 9.17825 23.1064 9.50016 22.6254C9.82206 22.1444 9.99392 21.5787 9.99393 20.9999C9.99394 20.2279 9.68844 19.4872 9.14414 18.9396C8.59985 18.392 7.86099 18.0821 7.08893 18.0774Z"
        fill={color}
      />
      <path
        d="M11.4639 31.0624C11.297 31.0659 11.1329 31.0196 10.9925 30.9295C10.8521 30.8393 10.7417 30.7094 10.6755 30.5562C10.6092 30.4031 10.59 30.2336 10.6204 30.0696C10.6508 29.9055 10.7294 29.7542 10.8462 29.6349C10.9629 29.5157 11.1126 29.4339 11.276 29.4001C11.4394 29.3662 11.6091 29.3818 11.7637 29.4448C11.9182 29.5079 12.0504 29.6155 12.1435 29.754C12.2366 29.8925 12.2863 30.0556 12.2864 30.2224C12.2887 30.3319 12.2692 30.4408 12.2289 30.5426C12.1886 30.6444 12.1284 30.7371 12.0517 30.8154C11.9751 30.8936 11.8837 30.9558 11.7827 30.9982C11.6818 31.0406 11.5734 31.0625 11.4639 31.0624ZM11.4639 27.3174C10.8844 27.314 10.3169 27.4829 9.83367 27.8027C9.35039 28.1225 8.9731 28.5787 8.74974 29.1134C8.52638 29.6482 8.46703 30.2372 8.57923 30.8058C8.69144 31.3743 8.97014 31.8966 9.37991 32.3064C9.78968 32.7162 10.312 32.9949 10.8806 33.1071C11.4491 33.2193 12.0381 33.1599 12.5729 32.9366C13.1076 32.7132 13.5638 32.3359 13.8836 31.8526C14.2034 31.3694 14.3723 30.8019 14.3689 30.2224C14.3643 29.4534 14.0567 28.7172 13.5129 28.1734C12.9691 27.6296 12.2329 27.322 11.4639 27.3174Z"
        fill={color}
      />
      <path
        d="M11.4639 12.5999C11.2963 12.6034 11.1316 12.5566 10.9908 12.4657C10.85 12.3747 10.7396 12.2437 10.6739 12.0896C10.6082 11.9354 10.59 11.7651 10.6219 11.6005C10.6537 11.4359 10.7341 11.2847 10.8526 11.1662C10.9711 11.0476 11.1224 10.9673 11.287 10.9354C11.4515 10.9036 11.6218 10.9217 11.776 10.9874C11.9302 11.0532 12.0612 11.1635 12.1522 11.3043C12.2431 11.4451 12.2899 11.6099 12.2864 11.7774C12.2864 11.9956 12.1998 12.2048 12.0455 12.359C11.8913 12.5133 11.6821 12.5999 11.4639 12.5999ZM11.4639 8.85494C11.0623 8.82379 10.6586 8.87601 10.2781 9.00831C9.89759 9.14062 9.54857 9.35015 9.25291 9.62376C8.95726 9.89737 8.72137 10.2292 8.56004 10.5983C8.39871 10.9674 8.31543 11.3659 8.31543 11.7687C8.31543 12.1715 8.39871 12.57 8.56004 12.9391C8.72137 13.3082 8.95726 13.64 9.25291 13.9136C9.54857 14.1872 9.89759 14.3968 10.2781 14.5291C10.6586 14.6614 11.0623 14.7136 11.4639 14.6824C12.1977 14.6255 12.883 14.2939 13.3829 13.7537C13.8827 13.2135 14.1604 12.5047 14.1604 11.7687C14.1604 11.0327 13.8827 10.3238 13.3829 9.78368C12.883 9.24352 12.1977 8.91185 11.4639 8.85494Z"
        fill={color}
      />
      <path
        d="M33.3389 25.375V16.625L39.1664 21L33.3389 25.375Z"
        fill={color}
      />
      <path
        d="M17.2915 38.5L15.7865 35.875C18.066 34.1225 19.9126 31.8699 21.1839 29.2908C22.4552 26.7118 23.1173 23.8753 23.119 21C23.0945 18.1269 22.4206 15.2965 21.1478 12.7206C19.875 10.1447 18.0362 7.88997 15.769 6.125L17.2915 3.5C20.0053 5.54041 22.2082 8.18314 23.7266 11.22C25.245 14.2568 26.0375 17.6047 26.0415 21C26.047 24.3969 25.2587 27.7482 23.7396 30.7865C22.2204 33.8248 20.0124 36.4662 17.2915 38.5Z"
        fill={color}
      />
    </svg>
  );
};

export const CloudAPISVG = ({ color }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
    >
      <path
        d="M35.334 8.75H30.084V12.25H35.334V33.25H30.084V36.75H35.334H38.834V33.25V12.25V8.75H35.334Z"
        fill={color}
      />
      <path d="M35.334 14L38.834 12.25H35.334V14Z" fill={color} />
      <path d="M38.834 31.5L35.334 33.25H38.834V31.5Z" fill={color} />
      <path
        d="M7.33398 36.75H12.584V33.25H7.33398V12.25H12.584V8.75H7.33398H3.83398V12.25V33.25V36.75H7.33398Z"
        fill={color}
      />
      <path d="M3.83398 31.5L7.33398 33.25H3.83398V31.5Z" fill={color} />
      <path d="M7.33398 14L3.83398 12.25H7.33398V14Z" fill={color} />
      <path d="M30.084 21H12.584V24.5H30.084V21Z" fill={color} />
      <path d="M30.084 26.25H12.584V29.75H30.084V26.25Z" fill={color} />
      <path d="M30.084 15.75H12.584V19.25H30.084V15.75Z" fill={color} />
    </svg>
  );
};
const WorkFlow = () => {
  const { theme } = useTheme();
  const { isMobile } = useDeviceCheck();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center gap-9">
      <div className="flex flex-row justify-between items-center">
        <div className="w-full text-center">
          <span
            className={`text-lg md:font-semibold md:text-xl ${theme === "dark" ? "text-[#9C9C9C]" : "text-slate-700"}`}
          >
            How It Works
          </span>
          <h1 className="font-bold text-lg md:text-4xl">
            How NerdBunny AI Discrepancies Detection Works
          </h1>
        </div>
      </div>
      <div
        className={`flex ${isMobile ? "flex-wrap" : "flex-row"} justify-center items-center gap-3 w-full`}
      >
        <Card>
          <CardHeader>
            <TransferSVG color={theme === "dark" ? "#EBECED" : "#252629"} />
          </CardHeader>
          <CardBody>
            <strong>Choose a Paper</strong>
            <span
              className={`${theme === "dark" ? "text-[#AFAFAF]" : "text-slate-800"}`}
            >
              Select a paper from our database or upload your own.
            </span>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CloudNatSVG color={theme === "dark" ? "#EBECED" : "#252629"} />
          </CardHeader>
          <CardBody>
            <strong>AI Analyzes for Errors</strong>
            <span
              className={`${theme === "dark" ? "text-[#AFAFAF]" : "text-slate-800"}`}
            >
              Checks math, methodology, logic, data integrity, and technical
              issues.
            </span>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CloudAPISVG color={theme === "dark" ? "#EBECED" : "#252629"} />
          </CardHeader>
          <CardBody>
            <strong>Receive Detailed Report</strong>
            <span
              className={`${theme === "dark" ? "text-[#AFAFAF]" : "text-slate-800"}`}
            >
              Comprehensive feedback with explanations and suggestions.
            </span>
          </CardBody>
        </Card>
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <Button
          isLoading={isPending}
          className={`shadow-2xl h-[46px] ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#EE43DE]"}`}
          radius="full"
          onPress={() =>
            startTransition(() => {
              router.push("/check");
            })
          }
        >
          <strong
            className={`text-[16px] flex flex-row justify-center items-center whitespace-pre-wrap text-center font-medium leading-none tracking-tight ${theme === "dark" ? "text-white" : "text-white"}`}
          >
            {"Start Free Analysis"}
            <FaPlus className="ml-2" />
          </strong>
        </Button>
      </div>
    </div>
  );
};

export default WorkFlow;
