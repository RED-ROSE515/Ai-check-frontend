"use client";
import { useState, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import Image from "next/image";
import LogoDark from "../public/LogoPurple.png";
import LogoLight from "../public/LogoLime.png";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import { TwitterSvg, TelegramSvg, TiktokSvg } from "@/app/footer";
import { CircularProgressBar } from "./CircularProgressBar";
import useDeviceCheck from "@/hooks/useDeviceCheck";
export const Navbar = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useDeviceCheck();
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
        className="shadow-xl flex flex-row justify-between w-5/6"
      >
        <NavbarContent className="flex w-full basis-full" justify="start">
          <NavbarItem className="flex gap-2 w-auto md:w-1/3">
            <NavbarBrand>
              <Link href="/">
                <Image
                  alt="Logo"
                  src={theme === "dark" ? LogoLight : LogoDark}
                  className="w-auto " // Responsive image size
                />
              </Link>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex w-full basis-full" justify="end">
          <NavbarItem className="flex items-center gap-2 md:gap-4">
            {/* Hide social icons on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <TwitterSvg theme={theme} />
              <TelegramSvg theme={theme} />
              <TiktokSvg theme={theme} />
            </div>

            <ThemeSwitch />
            <Link
              className="hidden md:flex ml-2 md:ml-8 text-sm md:text-base"
              href="/check"
            >
              Check
            </Link>
            <Link className="ml-2 md:ml-8 text-sm md:text-base" href="/about">
              About
            </Link>

            <CircularProgressBar className="ml-2 md:ml-4 h-[60px] w-[60px] md:h-[100px] md:w-[100px] text-sm md:text-md" />
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
    </div>
  );
};
