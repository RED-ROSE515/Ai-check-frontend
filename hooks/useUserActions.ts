import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { userApis } from "@/utils/apis";
import { useAuth } from "@/contexts/AuthContext";

interface UseUserActionsProps {
  showSignInModal?: (message: string) => void;
}

export const useUserActions = ({
  showSignInModal,
}: UseUserActionsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleFollow = async (userId: string, isFollowing: boolean) => {
    try {
      setIsLoading(true);
      await userApis.followUser(userId, isFollowing);
      toast({
        title: "Success",
        description: `Successfully ${isFollowing ? "unfollowed" : "followed"}!`,
      });
      return true;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to perform action",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleReport = async (postId: string, status: boolean) => {
    try {
      if (!isAuthenticated) {
        showSignInModal?.("You need to sign in to continue.");
        return false;
      }
      setIsLoading(true);
      await userApis.reportUser(postId, status);
      return true;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to report user",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleFollow,
    handleReport,
  };
};
