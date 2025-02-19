"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { SiInternetcomputer } from "react-icons/si";
import { Button } from "@heroui/react";
import LogoDark from "../../public/LogoPurple.png";
import LogoLight from "../../public/LogoLime.png";
import { useTheme } from "next-themes";

export default function SignUp() {
  const { theme } = useTheme();
  return (
    <div className="flex h-screen">
      {/* Left Section - Logo */}
      <div className="w-1/2  flex items-center justify-center">
        <div className="w-2/3 h-2/3 relative">
          <Image
            src={theme === "dark" ? LogoLight : LogoDark}
            alt="Company Logo"
            className="w-auto"
            fill
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Right Section - Sign Up */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[400px] space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">Join Today</h1>

          <div className="space-y-4">
            <Button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
              <FcGoogle className="text-xl" />
              Sign up with Google
            </Button>

            <Button className="w-full flex items-center justify-center gap-3 bg-black text-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors">
              <FaXTwitter className="text-xl" />
              Sign up with X
            </Button>

            <Button className="w-full flex items-center justify-center gap-3 bg-[#29ABE2] text-white rounded-lg px-6 py-3 hover:bg-[#1a9ed4] transition-colors">
              <SiInternetcomputer className="text-xl" />
              Sign up with Internet Identity
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <div>
            <Button className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors">
              Create Account
            </Button>

            <p className="text-sm font-semibold">
              By signing up, you agree to the Terms of Service and Privacy
              Policy.
            </p>
          </div>

          <div className="mt-4 text-md font-bold items-center w-full justify-center flex flex-col">
            Already have an account?
            <Button
              className="w-full"
              onPress={() => (window.location.href = "signin")}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
