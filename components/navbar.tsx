"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import _ from "lodash";
import {
  Link,
  Button,
  User,
  Image as HeroImage,
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import LogoDark from "../public/LogoPurple.png";
import LogoLight from "../public/LogoLime.png";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { MdLogin, MdLogout, MdCheck, MdInfo } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { useSearch } from "@/contexts/SearchContext";
import { usePagination } from "@/contexts/PaginationContext";
import { StatisticsIcon } from "./icons";

export const ListboxWrapper = ({ children }: any) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const ResearchAuditSVG = ({ className, color }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
    >
      <g clipPath="url(#clip0_2600_46157)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.25 2H15V10.1016C13.2791 9.10689 11.0403 9.3457 9.56802 10.818C7.8701 12.5159 7.81267 15.2331 9.39573 17H2.25V2ZM5.25 5H12V6.5H5.25V5ZM5.25 8H9V9.5H5.25V8ZM5.25 11H7.5V12.5H5.25V11Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.8713 11.8787C13.6997 10.7071 11.8003 10.7071 10.6287 11.8787C9.45711 13.0502 9.45711 14.9497 10.6287 16.1213C11.6171 17.1098 13.1237 17.2643 14.2742 16.5848L15.75 18.0607L16.8107 17L15.3348 15.5242C16.0143 14.3737 15.8598 12.8671 14.8713 11.8787ZM11.6893 12.9393C12.2751 12.3535 13.2249 12.3535 13.8107 12.9393C14.3964 13.5251 14.3964 14.4749 13.8107 15.0607C13.2249 15.6464 12.2751 15.6464 11.6893 15.0607C11.1036 14.4749 11.1036 13.5251 11.6893 12.9393Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2600_46157">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SpeechBookSVG = ({ className, color }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="2"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M7 8L14 12L7 16L7 8Z" fill={color} />
      <path
        d="M20 4L20 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 4L22 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const Navbar = () => {
  const { theme } = useTheme();
  const { setPage } = usePagination();
  const [isMounted, setIsMounted] = useState(false);
  const { setSortBy, setKeyword } = useSearch();
  const { isMobile } = useDeviceCheck();
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isCheckPending, startCheckTransition] = useTransition();
  const [isSpeechPending, startSpeechTransition] = useTransition();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const navigateTo = (link: string) => {
    window.location.href = link;
  };
  const iconClasses = `text-xl pointer-events-none flex-shrink-0 ${theme === "dark" ? "text-[#92A8BF]" : "text-[#828489]"}`;
  return (
    // <div className="flex items-center justify-center flex-row w-full relative">
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      style={{
        background: `${theme === "dark" ? "linear-gradient(0deg, #1E2A36 0%, #1E2A36 100%)" : "linear-gradient(0deg, #F7F7F7  0%, #F7F7F7 100%)"}`,
      }}
      // shouldHideOnScroll
      className="flex flex-row justify-between w-full bg-transparent h-[78px]"
    >
      <NavbarContent className="flex w-full flex-grow-0 basis-full overflow-y-hidden">
        <NavbarItem className="flex md:gap-2 w-full md:w-2/3">
          <NavbarBrand>
            <Link href="/" className="w-full">
              <Image
                alt="Logo"
                onClick={() => {
                  setSortBy("");
                  setKeyword("");
                  setPage(1);
                }}
                src={theme === "dark" ? LogoLight : LogoDark}
              />
            </Link>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden md:flex w-full ">
        <NavbarItem className="w-full items-center gap-2  md:flex justify-center">
          <SearchBar />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex w-full basis-full" justify="end">
        <NavbarItem className="flex items-center gap-[6px]">
          {/* <CircularProgressBar className="ml-2 md:ml-4 h-[60px] w-[60px] md:h-[100px] md:w-[100px] text-sm md:text-md" /> */}
          {isMobile ? (
            <Tooltip content="Research Audit">
              <Button
                isIconOnly
                variant="light"
                isLoading={isCheckPending}
                onPress={() =>
                  startCheckTransition(() => {
                    router.push("/check");
                  })
                }
                className={`w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-[50%] flex items-center justify-center ${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
              >
                <ResearchAuditSVG
                  className={iconClasses}
                  color={theme === "dark" ? "#92A8BF" : "#828489"}
                />
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="light"
              isLoading={isCheckPending}
              onPress={() =>
                startCheckTransition(() => {
                  router.push("/check");
                })
              }
              className={`flex items-center justify-center ${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
            >
              Research Audit
            </Button>
          )}

          {isMobile ? (
            <Tooltip content="Past Recordings">
              <Button
                isIconOnly
                variant="light"
                isLoading={isSpeechPending}
                onPress={() =>
                  startSpeechTransition(() => {
                    router.push("/speeches");
                  })
                }
                className={`w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-[50%] flex items-center justify-center ${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
              >
                <SpeechBookSVG
                  size={20}
                  className={iconClasses}
                  color={theme === "dark" ? "#798FA6" : "#828489"}
                />
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="light"
              isLoading={isSpeechPending}
              onPress={() =>
                startSpeechTransition(() => {
                  router.push("/speeches");
                })
              }
              className={`flex items-center justify-center ${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
            >
              Past Recordings
            </Button>
          )}

          {isMobile ? (
            <Tooltip content="Statistics">
              <Button
                isIconOnly
                variant="light"
                isLoading={isPending}
                onPress={() =>
                  startTransition(() => {
                    router.push("/statistics");
                  })
                }
                className={`w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-[50%] flex items-center justify-center ${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
              >
                <StatisticsIcon
                  size={20}
                  color={`${theme === "dark" ? "#798FA6" : "#828489"}`}
                />
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="light"
              isLoading={isPending}
              onPress={() =>
                startTransition(() => {
                  router.push("/statistics");
                })
              }
              className={`flex items-center justify-center ${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
            >
              Statistics
            </Button>
          )}
          <Tooltip content="Theme">
            <ThemeSwitch
              className={`${theme === "dark" ? "bg-[#2E3D4C]" : "bg-[#EBEBEB]"}`}
            />
          </Tooltip>

          <Dropdown
            placement="bottom-end"
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: `py-1 px-1 border border-default-200 ${theme === "dark" ? "bg-[#2E3D4C]" : ""}`,
            }}
          >
            <DropdownTrigger>
              <User
                avatarProps={{
                  src: isAuthenticated
                    ? user?.detail.avatar
                    : "https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4",
                  className: "w-[36px] h-[36px]",
                }}
                onClick={() => setOpen(true)}
                className="cursor-pointer"
                // description={
                //   <Link
                //     isExternal
                //     href={`${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`}
                //     size="sm"
                //     isDisabled={!isAuthenticated}
                //     className="text-[13px] opacity-[.6]"
                //   >
                //     @
                //     {isAuthenticated
                //       ? _.truncate(user?.detail.user_name, {
                //           length: 10,
                //           omission: "...",
                //         })
                //       : `guest`}
                //   </Link>
                // }
                // name={isAuthenticated ? user?.detail.first_name : "Guest"}
                name=""
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              variant="light"
              className="w-[340px]"
            >
              <DropdownSection title="">
                <DropdownItem key="avatar">
                  <div className="flex justify-between gap-3">
                    <div className="flex flex-row justify-start gap-4 items-center">
                      <HeroImage
                        isBlurred
                        isZoomed
                        alt="User Avatar"
                        radius="full"
                        className="object-cover"
                        shadow="lg"
                        style={
                          isMobile
                            ? { height: "30px", width: "30px" }
                            : { height: "50px", width: "50px" }
                        }
                        src={
                          isAuthenticated
                            ? user?.detail.avatar
                            : "https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4"
                        }
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="text-large font-bold leading-none text-default-600">
                          {_.truncate(user?.detail.first_name, {
                            length: 15,
                            omission: "...",
                          })}
                        </h4>
                        <Link
                          isExternal
                          href={`${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`}
                          size="sm"
                          isDisabled={!isAuthenticated}
                        >
                          <h5
                            className={`text-medium tracking-tight ${theme === "dark" ? "text-[#798FA6]" : "text-[#828489]"}`}
                          >
                            @
                            {isAuthenticated ? user?.detail.user_name : "guest"}
                          </h5>
                        </Link>
                      </div>
                    </div>
                    {isAuthenticated && (
                      <Button
                        className={`${theme === "dark" ? "bg-[#526477] text-[#C9D8E7" : "bg-[#FFF] text-[#252629]"} rounded-full`}
                        variant="bordered"
                        onPress={() =>
                          window.open(`${NOBLEBLOCKS_DOMAIN}/settings`)
                        }
                      >
                        Manage Profile
                      </Button>
                    )}
                  </div>
                </DropdownItem>
              </DropdownSection>
              {isAuthenticated ? (
                <DropdownSection
                  title=""
                  classNames={{
                    base: "border-none",
                    heading: "max-h-[320px]",
                  }}
                  className="border-2 rounded-md border-default-200 p-2 w-full"
                >
                  <DropdownItem
                    key="Research Audit"
                    //shortcut="⌘C"
                    startContent={
                      <ResearchAuditSVG
                        className={iconClasses}
                        color={theme === "dark" ? "#92A8BF" : "#828489"}
                      />
                    }
                    onPress={() => {
                      setOpen(false);
                      navigateTo("/check");
                    }}
                  >
                    Research Audit
                  </DropdownItem>
                  <DropdownItem
                    key="speeches"
                    //shortcut="⌘S"
                    startContent={
                      <SpeechBookSVG
                        className={iconClasses}
                        color={theme === "dark" ? "#92A8BF" : "#828489"}
                      />
                    }
                    onPress={() => {
                      setOpen(false);
                      navigateTo("/speeches");
                    }}
                  >
                    Past Recordings
                  </DropdownItem>
                  <DropdownItem
                    key="about"
                    //shortcut="⌘A"
                    startContent={<MdInfo className={iconClasses} />}
                    onPress={() => {
                      setOpen(false);
                      navigateTo("/about");
                    }}
                  >
                    About
                  </DropdownItem>
                  <DropdownItem
                    key="whitepaper"
                    startContent={<IoNewspaper className={iconClasses} />}
                    onPress={() => {
                      navigateTo(`https://nerdbunny.gitbook.io/nerdbunny`);
                    }}
                  >
                    WhitePaper
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    //shortcut="⌘Q"
                    color="danger"
                    startContent={<MdLogout className={iconClasses} />}
                    onPress={() => {
                      logout();
                      navigateTo("");
                    }}
                  >
                    Log out
                  </DropdownItem>
                </DropdownSection>
              ) : (
                <DropdownSection>
                  <DropdownItem
                    key="Research Audit"
                    //shortcut="⌘C"
                    startContent={<MdCheck className={iconClasses} />}
                    onPress={() => {
                      setOpen(false);
                      navigateTo("/check");
                    }}
                  >
                    Research Audit
                  </DropdownItem>
                  <DropdownItem
                    key="about"
                    //shortcut="⌘A"
                    startContent={<MdInfo className={iconClasses} />}
                    onPress={() => {
                      setOpen(false);
                      navigateTo("/about");
                    }}
                  >
                    About
                  </DropdownItem>
                  <DropdownItem
                    key="whitepaper"
                    startContent={<IoNewspaper className={iconClasses} />}
                    onPress={() => {
                      navigateTo(`https://nerdbunny.gitbook.io/nerdbunny`);
                    }}
                  >
                    WhitePaper
                  </DropdownItem>
                  <DropdownItem
                    key="login"
                    //shortcut="⌘L"
                    startContent={<MdLogin className={iconClasses} />}
                    onPress={() => {
                      navigateTo(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login_with_nobleblocks?app_name=NerdBunny&redirect_url=${DOMAIN + "/login_with_nobleblocks"}`
                      );
                    }}
                  >
                    Log in with Nobleblocks
                  </DropdownItem>
                </DropdownSection>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
    // </div>
  );
};
