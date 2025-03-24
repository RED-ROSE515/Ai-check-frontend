import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Link,
  Avatar,
  Button,
  CardFooter,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Skeleton,
} from "@heroui/react";
import _ from "lodash";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { MdReport, MdOutlineContentCopy } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useUserActions } from "@/hooks/useUserActions";
import { CheckIcon } from "lucide-react";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";
import { formatTimestamp } from "@/utils/date";
import useGetData from "@/app/service/get-data";
import { commify } from "@/utils/number_utils";
import { useTheme } from "next-themes";

const UserCard = ({
  userData,
  postDate,
  link,
  showSignInModal,
  totalData,
  reportPost,
  showFollow = true,
  input_tokens,
  output_tokens,
}: any) => {
  const formattedDate = `Audited on: ` + formatTimestamp(postDate);
  const { isMobile } = useDeviceCheck();
  const { theme } = useTheme();
  const { handleFollow } = useUserActions({
    showSignInModal,
  });

  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const { data: userDetail, isLoading: userDetailLoading } = useGetData(
    `user/profile?user_id=${userData.user_name}`
  );

  const follow = async () => {
    if (!isAuthenticated) {
      showSignInModal("You need to sign in to continue.");
      return;
    }
    if (!userDetail) return;
    const success = await handleFollow(userDetail.id, userDetail?.is_following);
    // if (success) {
    //   await fetchUserDetail();
    // }
  };

  // if (!userDetail) return null;

  return userDetailLoading ? (
    <Card className="h-[61px] w-full space-y-5 p-4" radius="lg">
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  ) : (
    <Card
      // isBlurred
      className="border-none bg-transparent w-full"
      // className="border-none bg-background/60 dark:bg-default-100/50 mb-4 "
      shadow="none"
    >
      <CardBody className="w-full overflow-hidden">
        <div className="flex flex-row w-full justify-start gap-3">
          <Popover
            showArrow
            placement="bottom"
            isOpen={isHovered}
            onOpenChange={(open) => setIsHovered(open)}
          >
            <PopoverTrigger>
              <div
                className="min-w-fit"
                onMouseEnter={() => setIsHovered(true)}
              >
                <Image
                  isBlurred
                  isZoomed
                  alt="User Avatar"
                  className="object-cover rounded-[50%]"
                  width={isMobile ? 36 : 36}
                  shadow="lg"
                  style={
                    isMobile
                      ? { height: "36px", width: "36px" }
                      : { height: "36px", width: "36px" }
                  }
                  src={
                    userData.avatar
                      ? userData.avatar
                      : "https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4"
                  }
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="p-1"
              onMouseLeave={() => setIsHovered(false)}
            >
              <Card
                className="max-w-[300px] border-none bg-transparent"
                shadow="none"
              >
                <CardHeader className="justify-between">
                  <div className="flex gap-3">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={userData.avatar}
                    />
                    <div className="flex flex-col items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {_.truncate(userData.first_name, {
                          length: 15,
                          omission: "...",
                        })}
                      </h4>
                      <Link
                        isExternal
                        href={`${NOBLEBLOCKS_DOMAIN}/@${userData.user_name}`}
                        size="sm"
                      >
                        <h5 className="text-small tracking-tight text-blue-700">
                          {`@` + userData.user_name}
                        </h5>
                      </Link>
                    </div>
                  </div>
                  {
                    <Button
                      className={
                        // userDetail?.is_following
                        // ? "bg-transparent text-foreground border-default-200 ml-2"
                        "ml-2"
                      }
                      color="primary"
                      radius="full"
                      size="sm"
                      // variant={userDetail?.is_following ? "bordered" : "solid"}
                      variant={"bordered"}
                      // onPress={() => follow()}
                      onPress={() =>
                        window.open(
                          `${NOBLEBLOCKS_DOMAIN}/@${userData.user_name}`,
                          "_blank"
                        )
                      }
                    >
                      {/* {userDetail?.is_following ? "Unfollow" : "Follow"} */}
                      View Profile
                    </Button>
                  }
                </CardHeader>
                <CardBody className="px-3 py-0">
                  <p className="text-small pl-px text-default-500">
                    {_.truncate(userData.about_me, {
                      length: 100,
                      omission: "...",
                    })}
                    <span aria-label="confetti" role="img">
                      🎉
                    </span>
                  </p>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">
                      {userDetail?.count_following}
                    </p>
                    <p className=" text-default-500 text-small">Following</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">
                      {userDetail?.count_followers}
                    </p>
                    <p className="text-default-500 text-small">Followers</p>
                  </div>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
          <div className="flex justify-between items-center flex-grow w-0">
            <div className="flex flex-col gap-[1px] flex-grow w-0">
              <span
                className="text-[16px] leading-[16px] max-w-[99%] truncate"
                style={{ fontWeight: 500 }}
              >
                {userData.first_name}
              </span>
              <span className="text-[14px] font-normal text-gray-500 leading-[20px] truncate ">
                {formattedDate}
              </span>
            </div>
            {showFollow && (
              <div className="flex flex-row justify-center items-center">
                <AnimatedSubscribeButton
                  subscribeStatus={userDetail?.is_following}
                  disabled={!isAuthenticated}
                  onClick={() => follow()}
                >
                  <span className="group inline-flex items-center text-sm">
                    Follow
                    {/* <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" /> */}
                  </span>
                  <span className="group inline-flex items-center text-sm">
                    <CheckIcon className="bg-white rounded-full text-[#118E40] mr-2 size-4" />
                    Followed
                  </span>
                </AnimatedSubscribeButton>

                <Popover
                  offset={10}
                  placement="bottom-end"
                  backdrop="transparent"
                >
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      className="text-default-900/60 data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PiDotsThreeOutlineVerticalFill size={17} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={`min-w-[150px] border-2 ${theme === "dark" ? "bg-[#2E3E4E] border-[#4B5C6E]" : "bg-[#F7F7F7] border-[#A4A4A4]"}`}
                  >
                    {() => (
                      <div
                        className={`w-full flex flex-col gap-2 ${theme === "dark" ? "bg-[#2E3E4E]" : "bg-[#F7F7F7]"}`}
                      >
                        <Button
                          startContent={<MdOutlineContentCopy size={24} />}
                          className="w-full hover:[#3E5061]"
                          variant="light"
                          onPress={() => {
                            navigator.clipboard.writeText(link);
                            toast({
                              title: "Success",
                              description: "Successfully Copied the link!",
                            });
                          }}
                        >
                          Share
                        </Button>
                        <Button
                          variant="light"
                          className="w-full"
                          startContent={<MdReport size={24} />}
                          onPress={reportPost}
                        >
                          {totalData.reported_me ? "UnReport" : "Report"}
                        </Button>
                        {input_tokens && output_tokens ? (
                          <Card
                            className={`text-sm md:text-md w-full items-center space-x-4 p-2 md:p-4 flex flex-row justify-center  ${theme === "dark" ? "bg-[#242F3C]" : "bg-gray-200"}`}
                          >
                            <p>{`IN: ${commify(input_tokens)}`}</p>
                            <p>|</p>
                            <p>{`OUT: ${commify(output_tokens)}`}</p>
                          </Card>
                        ) : (
                          <div />
                        )}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
