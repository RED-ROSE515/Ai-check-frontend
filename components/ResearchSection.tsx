import React, { useTransition } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { Card, Button, CardBody } from "@heroui/react";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const DataStreamSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_2377_4721)">
        <path
          d="M3.71212 6.1125C4.62319 6.1125 5.36175 5.37377 5.36175 4.4625C5.36175 3.55123 4.62319 2.8125 3.71212 2.8125C2.80106 2.8125 2.0625 3.55123 2.0625 4.4625C2.0625 5.37377 2.80106 6.1125 3.71212 6.1125Z"
          fill="currentColor"
        />
        <path
          d="M3.71212 13.5925C4.62319 13.5925 5.36175 12.8538 5.36175 11.9425C5.36175 11.0312 4.62319 10.2925 3.71212 10.2925C2.80106 10.2925 2.0625 11.0312 2.0625 11.9425C2.0625 12.8538 2.80106 13.5925 3.71212 13.5925Z"
          fill="currentColor"
        />
        <path
          d="M3.71212 21.072C4.62319 21.072 5.36175 20.3332 5.36175 19.422C5.36175 18.5107 4.62319 17.772 3.71212 17.772C2.80106 17.772 2.0625 18.5107 2.0625 19.422C2.0625 20.3332 2.80106 21.072 3.71212 21.072Z"
          fill="currentColor"
        />
        <path
          d="M19.7568 14.0059C20.8959 14.0059 21.8193 13.0824 21.8193 11.9434C21.8193 10.8043 20.8959 9.88086 19.7568 9.88086C18.6177 9.88086 17.6943 10.8043 17.6943 11.9434C17.6943 13.0824 18.6177 14.0059 19.7568 14.0059Z"
          fill="currentColor"
        />
        <path
          d="M6.95166 12.933H10.4397C10.5772 12.6946 10.7264 12.4634 10.8869 12.2403L11.0956 11.9391C10.877 11.6379 10.6683 11.3266 10.4596 10.9351H6.95166C7.02764 11.1933 7.07431 11.4594 7.09079 11.7282V12.1499C7.07515 12.4156 7.02845 12.6784 6.95166 12.933Z"
          fill="currentColor"
        />
        <path
          d="M13.5005 8.90665L13.2719 8.49501L12.9937 8.03317L12.5564 7.1597C11.3043 4.64971 10.0124 3.49512 7.40879 3.49512H6.95166C7.04555 3.82129 7.09241 4.15943 7.09079 4.49911C7.09269 4.83881 7.04583 5.177 6.95166 5.50311H7.40879C9.01866 5.50311 9.72422 6.01514 10.6981 7.79221L10.9366 8.22393L11.1751 8.70585C12.616 11.6174 13.6595 12.7218 16.0743 12.9628C15.9954 12.6341 15.9553 12.297 15.955 11.9588C15.9562 11.6193 16.003 11.2815 16.0942 10.9548H16.1538C14.9812 10.8444 14.3054 10.3323 13.5005 8.90665Z"
          fill="currentColor"
        />
        <path
          d="M11.672 14.2983L11.4335 14.7501L11.0558 15.5132L10.8173 15.965L10.5888 16.3766C9.67453 17.993 8.95904 18.4649 7.40879 18.4649H6.95166C7.02932 18.7227 7.07603 18.989 7.09079 19.2581V19.6295C7.07519 19.8985 7.0285 20.1647 6.95166 20.4227H7.66716C10.0621 20.3524 11.354 19.1878 12.6359 16.7682L13.1725 15.6939L13.3812 15.3023L13.5601 14.971C13.704 14.7202 13.8633 14.4788 14.0371 14.2481C13.4205 14.0152 12.8488 13.6754 12.3477 13.2441C12.0946 13.5765 11.8686 13.929 11.672 14.2983Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2377_4721">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const TrelloSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.39 18.2401V8.00014L11.52 2.89014V7.55014L16.37 10.3201L16.35 15.9101L20.39 18.2401Z"
        fill="currentColor"
      />
      <path
        d="M14.7901 19.8599V11.2299L7.33008 6.91992V10.9399L11.3401 13.2299L11.3201 17.8499L14.7901 19.8599Z"
        fill="currentColor"
      />
      <path
        d="M9.75994 21.1501V14.1401L3.68994 10.6401V14.0001L6.85994 15.8101L6.83994 19.4701L9.75994 21.1501Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const DataBaseSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4.69 7.70002L9.38 4.99002V2.27002L2.25 6.38002L2.64 6.86002L4.26 7.74002L4.69 7.70002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.38 17.3599L2.25 13.2499V10.6599L9.38 14.7799V17.3599ZM9.38 19.1299L2.25 14.9999V17.5999L9.38 21.7199V19.1299ZM9.38 10.4199L4.69 7.69988L2.25 6.37988V8.87988L9.38 12.9999"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.37961 21.7298L16.3796 17.7298V15.0998L9.37961 19.0998M9.37961 14.7498L16.3796 10.7498H18.4596V13.0798H16.7796L9.37961 17.3698V14.7498ZM9.37961 12.9798L16.7896 8.6998H19.2296V10.0598L21.7396 7.5498L19.2296 5.0498V6.3698H16.3596L15.1296 7.0898L14.0696 7.6998L11.3496 9.2698L9.34961 10.4198L9.37961 12.9798Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.37988 4.99002L12.5399 6.82002L14.8999 5.46002L9.37988 2.27002V4.99002Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M11.2497 4.16675L17.083 10.0001L11.2497 15.8334M2.91634 10.0001L16.6663 10.0001"
        stroke="white"
        strokeWidth="1.6"
      />
    </svg>
  );
};
const ResearchSection = () => {
  const { isMobile } = useDeviceCheck();
  const { theme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-col justify-center gap-9">
      <div className="flex flex-row justify-between items-center">
        <div className="w-full text-center">
          <span
            className={`text-lg md:text-xl ${theme === "dark" ? "text-[#9C9C9C]" : "text-slate-700"}`}
          >
            Why Choose NerdBunny?
          </span>
          <h1 className="font-bold text-lg md:text-4xl">
            Ensuring Accuracy, Integrity, and Insight in Research
          </h1>
        </div>
      </div>
      <div
        className={`flex ${isMobile ? "flex-wrap" : "flex-row"} justify-center items-center gap-10 w-full`}
      >
        <Card className="flex flex-col md:flex-row justify-between p-4">
          <CardBody>
            <div className="flex flex-row justify-start">
              <DataStreamSVG />
              <strong className="ml-2">AI Accuracy</strong>
            </div>
            <span
              className={`${theme === "dark" ? "text-[#AFAFAF]" : "text-slate-800"}`}
            >
              Detects complex errors beyond grammar, including logical,
              methodological, and statistical issues.
            </span>
          </CardBody>

          <CardBody>
            <div className="flex flex-row justify-start">
              <TrelloSVG />
              <strong className="ml-2">Comprehensive Reports</strong>
            </div>
            <span
              className={`${theme === "dark" ? "text-[#AFAFAF]" : "text-slate-800"}`}
            >
              Detailed feedback with clear explanations.
            </span>
          </CardBody>

          <CardBody>
            <div className="flex flex-row justify-start">
              <DataBaseSVG />
              <strong className="ml-2">Improve Research Integrity</strong>
            </div>
            <span
              className={`${theme === "dark" ? "text-[#AFAFAF]" : "text-slate-800"}`}
            >
              Contribute to higher standards in scientific publishing.
            </span>
          </CardBody>
        </Card>
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <Button
          isLoading={isPending}
          className={`shadow-2xl h-[46px] ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#C8E600]"}`}
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
            {"Start Your Free Trial"}
            <FaArrowRight className="ml-2" />
          </strong>
        </Button>
      </div>
    </div>
  );
};

export default ResearchSection;
