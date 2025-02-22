import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { postApis } from "@/utils/apis";
import { useAuth } from "@/contexts/AuthContext";

interface UsePostActionsProps {
  showSignInModal?: (message: string) => void;
}

export const usePostActions = ({
  showSignInModal,
}: UsePostActionsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleReport = async (postId: string, status: boolean) => {
    try {
      if (!isAuthenticated) {
        showSignInModal?.("You need to Sign in first to report this post.");
        return false;
      }
      setIsLoading(true);
      await postApis.reportPost(postId, status);
      toast({
        title: "Success",
        description: status
          ? "Successfully unreported!"
          : "Successfully reported!",
      });
      return true;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to report post",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleReport,
  };
};
