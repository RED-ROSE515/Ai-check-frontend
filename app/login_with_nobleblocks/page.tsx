"use client";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { sleep } from "@/components/file-upload";
import { getCookie } from "cookies-next";

const LoginWithNobleblocksPage = () => {
  const { isAuthenticated, user, loginWithNobleblocks } = useAuth();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const path = window.location.href;
        const state = path.split("state=")[1];
        await loginWithNobleblocks(state);

        // First, wait and check for cookie
        // const storedUser = Cookies.get("NERDBUNNY_SESSION");
        // console.log(storedUser);
        // if (!storedUser) {
        //   toast({
        //     variant: "destructive",
        //     title: "Login Error",
        //     description: "No session found",
        //     duration: 2000,
        //   });
        //   router.push("/");
        //   return;
        // }

        // // Cookie exists, proceed with user initialization
        // if (!isAuthenticated) {
        //   await sleep(3000);
        //   const tempUserData = JSON.parse(storedUser);
        //   const userData = {
        //     email: "",
        //     detail: tempUserData?.user,
        //     token: tempUserData?.token.token,
        //   };

        //   localStorage.setItem("user", JSON.stringify(userData));
        //   setUserData(userData);

        toast({
          title: "Login with Nobleblocks",
          description: "Successfully Login with Nobleblocks!",
          duration: 2000,
        });

        await sleep(1000);
        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        toast({
          variant: "destructive",
          title: "Login Error",
          description: "Something went wrong!" + { error },
          duration: 2000,
        });
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
    console.log("///////////////////////////////////////////");
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <Loader className="mt-4" />
      ) : (
        <div>
          <h1 className={title()}>Successfully Login with Nobleblocks</h1>
        </div>
      )}
    </div>
  );
};

export default LoginWithNobleblocksPage;
