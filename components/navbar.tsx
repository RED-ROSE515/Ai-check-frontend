"use client";
import { useState, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import Image from "next/image";
import LogoDark from "../public/LogoPurple.png";
import LogoLight from "../public/LogoLime.png";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-center flex-row">
      <HeroUINavbar
        maxWidth="xl"
        position="sticky"
        className={`shadow-xl flex flex-row justify-between md:w-5/6 w-full`}
      >
        <NavbarContent
          className="sm:flex w-full sm:basis-full"
          style={{ marginLeft: "-1.5rem" }}
          justify="start"
        >
          <NavbarItem className=" sm:flex gap-2 sm:w-1/3">
            <Link href="/">
              <Image alt="Logo" src={theme === "dark" ? LogoLight : LogoDark} />
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          style={{ marginRight: "-0.5rem" }}
          className="sm:flex w-full sm:basis-full"
          justify="end"
        >
          <NavbarItem className="sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
    </div>
  );
};
