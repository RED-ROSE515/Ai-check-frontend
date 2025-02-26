"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import _ from "lodash";
import {
  Link,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Listbox,
  ListboxItem,
  ListboxSection,
  Image as HeroImage,
} from "@heroui/react";
import Image from "next/image";
import LogoDark from "../public/LogoPurple.png";
import LogoLight from "../public/LogoLime.png";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { CircularProgressBar } from "./CircularProgressBar";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { ImProfile, ImSearch } from "react-icons/im";
import { MdLogin, MdLogout, MdCheck, MdInfo } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";

export const ListboxWrapper = ({ children }: any) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const Navbar = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useDeviceCheck();
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [isPending, startTransition] = useTransition();
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
  const UserActions = () => {
    const iconClasses =
      "text-xl text-default-500 pointer-events-none flex-shrink-0";
    return (
      <ListboxWrapper>
        <Listbox
          aria-label="Listbox menu with sections"
          variant="flat"
          // disabledKeys={isAuthenticated ? [""] : ["profile", "logout"]}
        >
          {isAuthenticated ? (
            <ListboxSection title="User Actions">
              <ListboxItem
                key="Research Audit"
                description="Check your own paper"
                startContent={<MdCheck className={iconClasses} />}
                onPress={() => {
                  setOpen(false);
                  navigateTo("/check");
                }}
              >
                Research Audit
              </ListboxItem>
              <ListboxItem
                key="profile"
                description="View Profile Page"
                startContent={<ImProfile className={iconClasses} />}
                onPress={() =>
                  window.open(
                    `https://uy7p3-zyaaa-aaaap-qpmoq-cai.icp0.io/@${user?.detail.user_name}`
                  )
                }
              >
                View Profile
              </ListboxItem>
              <ListboxItem
                key="about"
                description="About the site"
                startContent={<MdInfo className={iconClasses} />}
                onPress={() => {
                  setOpen(false);
                  navigateTo("/about");
                }}
              >
                About
              </ListboxItem>
              <ListboxItem
                key="logout"
                description="Log out"
                className="text-danger"
                color="danger"
                startContent={<MdLogout className={iconClasses} />}
                onPress={() => {
                  logout();
                  navigateTo("");
                }}
              >
                Log out
              </ListboxItem>
            </ListboxSection>
          ) : (
            <ListboxSection title="Guest Actions">
              <ListboxItem
                key="Research Audit"
                description="Check your own paper"
                startContent={<MdCheck className={iconClasses} />}
                onPress={() => {
                  setOpen(false);
                  navigateTo("/check");
                }}
              >
                Research Audit
              </ListboxItem>
              <ListboxItem
                key="about"
                description="About the site"
                startContent={<MdInfo className={iconClasses} />}
                onPress={() => {
                  setOpen(false);
                  navigateTo("/about");
                }}
              >
                About
              </ListboxItem>
              <ListboxItem
                key="login"
                description="Log in"
                startContent={<MdLogin className={iconClasses} />}
                onPress={() => {
                  setOpen(false);
                  navigateTo("/signin");
                }}
              >
                Log in
              </ListboxItem>
            </ListboxSection>
          )}
        </Listbox>
      </ListboxWrapper>
    );
  };
  return (
    <div className="flex items-center justify-center flex-row w-full">
      <HeroUINavbar
        maxWidth="full"
        position="sticky"
        height={isMobile ? "4rem" : "5rem"}
        className="shadow-xl flex flex-row justify-between w-full md:w-5/6"
      >
        <NavbarContent className="flex w-full basis-full overflow-y-hidden">
          <NavbarItem className="flex md:gap-2 w-auto md:w-1/2">
            <NavbarBrand>
              <Link href="/">
                <Image
                  alt="Logo"
                  src={theme === "dark" ? LogoLight : LogoDark}
                  className="w-auto" // Responsive image size
                />
              </Link>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex w-full basis-full">
          <NavbarItem className="flex w-full items-center gap-2 justify-center">
            <Input
              classNames={{
                base: "max-w-full w-2/3 h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<ImSearch size={18} />}
              type="search"
            />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex w-full basis-full" justify="end">
          <NavbarItem className="flex items-center gap-2 md:gap-4">
            {/* <CircularProgressBar className="ml-2 md:ml-4 h-[60px] w-[60px] md:h-[100px] md:w-[100px] text-sm md:text-md" /> */}
            <Button
              isIconOnly
              variant="light"
              isLoading={isPending}
              onPress={() =>
                startTransition(() => {
                  router.push("/statistics");
                })
              }
            >
              <MdOutlineAnalytics size={24} />
            </Button>
            <ThemeSwitch />

            <Popover
              showArrow
              placement="bottom"
              isOpen={isOpen}
              onClose={() => setOpen(false)}
            >
              <PopoverTrigger>
                <User
                  avatarProps={{
                    src: isAuthenticated
                      ? user?.detail.avatar
                      : "https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4",
                  }}
                  onClick={() => setOpen(true)}
                  className="cursor-pointer"
                  description={
                    <Link
                      isExternal
                      href={`https://uy7p3-zyaaa-aaaap-qpmoq-cai.icp0.io/@${user?.detail.user_name}`}
                      size="sm"
                      isDisabled={!isAuthenticated}
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
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <Card
                  className="min-w-[300px] border-none bg-transparent"
                  shadow="none"
                >
                  <CardHeader className="justify-between">
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
                          href={`https://uy7p3-zyaaa-aaaap-qpmoq-cai.icp0.io/@${user?.detail.user_name}`}
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
                  </CardHeader>
                  <CardBody className="px-3 py-0">
                    {user?.detail.about_me && (
                      <p className="text-small pl-px text-default-500">
                        {_.truncate(user?.detail.about_me, {
                          length: 100,
                          omission: "...",
                        })}
                        <span aria-label="confetti" role="img">
                          🎉
                        </span>
                      </p>
                    )}
                  </CardBody>
                  <CardFooter className="gap-3">
                    <UserActions />
                  </CardFooter>
                </Card>
              </PopoverContent>
            </Popover>
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
    </div>
  );
};
