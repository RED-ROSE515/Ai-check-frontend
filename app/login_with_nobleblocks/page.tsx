"use client";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { sleep } from "@/components/file-upload";

export default function PricingPage() {
  const { isAuthenticated, user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const initUser = async () => {
      if (!isAuthenticated) {
        setLoading(true);
        const storedUser = Cookies.get("NERDBUNNY_SESSION");
        if (!storedUser) {
          alert("error");
          toast({
            variant: "destructive",
            title: "Login with Nobleblocks",
            description: "Uh, oh! Something went wrong!",
            duration: 2000,
          });
          await sleep(2000);
          router.push("/");
          return;
        }

        // Add 3 second delay
        await sleep(3000);

        localStorage.setItem("user", storedUser);
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
        alert(true);
        toast({
          title: "Login with Nobleblocks",
          description: "Successfully Login with Nobleblocks!",
          duration: 2000,
        });
        await sleep(1000);
        router.push("/");
      }
    };

    initUser();
  }, []);
  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <Loader />
      ) : (
        <h1 className={title()}>Successfully Login with Nobleblocks</h1>
      )}
    </div>
  );
}
