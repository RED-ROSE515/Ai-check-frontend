"use client";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { sleep } from "@/components/file-upload";

const LoginWithNobleblocksPage = () => {
  const { loginWithNobleblocks } = useAuth();
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

  return (
    <div className="w-full flex justify-center h-[80vh]">
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
