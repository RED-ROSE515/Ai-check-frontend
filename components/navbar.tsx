"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import _ from "lodash";
import {
  Link,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Listbox,
  ListboxItem,
  ListboxSection,
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
} from "@heroui/react";
import Image from "next/image";
import LogoDark from "../public/LogoPurple.png";
import LogoLight from "../public/LogoLime.png";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { CircularProgressBar } from "./CircularProgressBar";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { ImProfile } from "react-icons/im";
import { MdLogin, MdLogout, MdCheck, MdInfo } from "react-icons/md";
import { LuSpeech } from "react-icons/lu";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuChartColumn } from "react-icons/lu";
import SearchBar from "./SearchBar";
import { useSearch } from "@/contexts/SearchContext";
import { usePagination } from "@/contexts/PaginationContext";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

export const ListboxWrapper = ({ children }: any) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const Navbar = () => {
  const { theme } = useTheme();
  const { setPage } = usePagination();
  const [isMounted, setIsMounted] = useState(false);
  const { setSortBy, setKeyword } = useSearch();
  const { isMobile } = useDeviceCheck();
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [isPending, startTransition] = useTransition();
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
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  return (
    <div className="flex items-center justify-center flex-row w-full relative">
      <HeroUINavbar
        maxWidth="full"
        position="sticky"
        style={{
          background: `${theme === "dark" ? "linear-gradient(0deg, #1E2A36 0%, #1E2A36 100%)" : "linear-gradient(0deg, #C8AAFF 0%, #C8AAFF 100%)"}`,
        }}
        // shouldHideOnScroll
        className="flex flex-row justify-between w-full bg-transparent h-[78px]"
      >
        <NavbarContent className="flex w-full basis-full overflow-y-hidden">
          <NavbarItem className="flex md:gap-2 md:w-1/3">
            <NavbarBrand>
              <Link href="/" className="w-[210px]">
                <Image
                  alt="Logo"
                  onClick={() => {
                    setSortBy("");
                    setKeyword("");
                    setPage(1);
                  }}
                  src={LogoLight}
                  className="h-[37px] w-[209px]" // Responsive image size
                />
              </Link>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="flex w-full basis-full">
          <NavbarItem className="w-full items-center gap-2 hidden md:flex justify-center">
            <SearchBar />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="flex w-full basis-full" justify="end">
          <NavbarItem className="flex items-center gap-[6px]">
            {/* <CircularProgressBar className="ml-2 md:ml-4 h-[60px] w-[60px] md:h-[100px] md:w-[100px] text-sm md:text-md" /> */}
            <ThemeSwitch />
            <Button
              isIconOnly
              variant="light"
              isLoading={isPending}
              onPress={() =>
                startTransition(() => {
                  router.push("/statistics");
                })
              }
              className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-[50%] bg-[#ffffff40] flex items-center justify-center opacity-[0.5]"
            >
              <LuChartColumn size={20} />
            </Button>

            <Dropdown
              placement="bottom-end"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "py-1 px-1 border border-default-200 ",
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
                  description={
                    <Link
                      isExternal
                      href={`${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`}
                      size="sm"
                      isDisabled={!isAuthenticated}
                      className="text-[13px] opacity-[.6]"
                    >
                      @
                      {isAuthenticated
                        ? _.truncate(user?.detail.user_name, {
                            length: 10,
                            omission: "...",
                          })
                        : `guest`}
                    </Link>
                  }
                  name={isAuthenticated ? user?.detail.first_name : "Guest"}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                variant="faded"
                className="w-[300px]"
              >
                <DropdownSection title="">
                  <DropdownItem key="avatar">
                    <div className="flex gap-3">
                      <HeroImage
                        isBlurred
                        isZoomed
                        alt="User Avatar"
                        radius="full"
                        className="object-cover"
                        shadow="lg"
                        style={
                          isMobile
                            ? { height: "40px", width: "40px" }
                            : { height: "60px", width: "60px" }
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
                          <h5 className="text-medium tracking-tight text-blue-700">
                            @
                            {isAuthenticated ? user?.detail.user_name : "guest"}
                          </h5>
                        </Link>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownSection>
                {isAuthenticated ? (
                  <DropdownSection
                    title="User Actions"
                    className="border-2 rounded-md border-default-200 p-2 w-full"
                  >
                    <DropdownItem
                      key="Research Audit"
                      //shortcut="⌘C"
                      className="py-3"
                      startContent={<MdCheck className={iconClasses} />}
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
                      className="py-3"
                      startContent={<LuSpeech className={iconClasses} />}
                      onPress={() => {
                        setOpen(false);
                        navigateTo("/speeches");
                      }}
                    >
                      Speech Book
                    </DropdownItem>
                    <DropdownItem
                      key="profile"
                      //shortcut="⌘P"
                      className="py-3"
                      startContent={<ImProfile className={iconClasses} />}
                      onPress={() =>
                        window.open(
                          `${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`
                        )
                      }
                    >
                      View Profile
                    </DropdownItem>
                    <DropdownItem
                      key="about"
                      //shortcut="⌘A"
                      className="py-3"
                      startContent={<MdInfo className={iconClasses} />}
                      onPress={() => {
                        setOpen(false);
                        navigateTo("/about");
                      }}
                    >
                      About
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      //shortcut="⌘Q"
                      className="text-danger py-3"
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
                  <DropdownSection title="Guest Actions">
                    <DropdownItem
                      key="Research Audit"
                      //shortcut="⌘C"
                      className="py-3"
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
                      className="py-3"
                      startContent={<MdInfo className={iconClasses} />}
                      onPress={() => {
                        setOpen(false);
                        navigateTo("/about");
                      }}
                    >
                      About
                    </DropdownItem>
                    <DropdownItem
                      key="login"
                      //shortcut="⌘L"
                      className="py-3"
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
    </div>
  );
};
