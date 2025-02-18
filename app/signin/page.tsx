"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInDialog from "@/components/SignInDialog";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignInDialog
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </main>
  );
}
