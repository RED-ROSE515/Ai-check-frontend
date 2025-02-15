"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from "@heroui/react";
import Image from "next/image";
import LogoDark from "../public/LogoPurple.png";
import LogoLight from "../public/LogoLime.png";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import { TwitterSvg, TelegramSvg, TiktokSvg } from "@/app/footer";
import { CircularProgressBar } from "./CircularProgressBar";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { Sling as Hamburger } from "hamburger-react";
export const Navbar = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useDeviceCheck();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-center flex-row w-full">
      <HeroUINavbar
        maxWidth="full"
        position="sticky"
        height={isMobile ? "4rem" : "7rem"}
        className="shadow-xl flex flex-row justify-between w-full md:w-5/6"
      >
        <NavbarContent
          className="flex w-full basis-full overflow-y-hidden"
          justify="start"
        >
          <NavbarItem className="flex md:gap-2 w-auto md:w-1/3">
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

        <NavbarContent className="flex w-full basis-full" justify="end">
          <NavbarItem className="flex items-center gap-2 md:gap-4">
            {/* <div className="hidden md:flex items-center gap-4">
              <TwitterSvg theme={theme} />
              <TelegramSvg theme={theme} />
              <TiktokSvg theme={theme} />
            </div> */}

            <ThemeSwitch />

            <div className="flex flex-row justify-center gap-2">
              <Link
                className="ml-2 md:ml-8 text-sm md:text-base w-full"
                href="/check"
              >
                <Button variant="ghost">Check</Button>
              </Link>
              <Dropdown
                backdrop="blur"
                placement="bottom-end"
                onClose={() => setOpen(false)}
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    className={`flex flex-row justify-center ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#C8E600]"}`}
                    variant="ghost"
                  >
                    <div>
                      <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="faded">
                  {/* <DropdownItem key="check"></DropdownItem> */}
                  <DropdownItem key="about">
                    <Link
                      className="ml-2 md:ml-8 text-sm md:text-base w-full"
                      href="/about"
                    >
                      About
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <CircularProgressBar className="ml-2 md:ml-4 h-[60px] w-[60px] md:h-[100px] md:w-[100px] text-sm md:text-md" />
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
    </div>
  );
};
