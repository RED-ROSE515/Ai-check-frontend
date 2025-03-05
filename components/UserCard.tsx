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
} from "@heroui/react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistance, format, differenceInDays } from "date-fns";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { MdReport, MdOutlineContentCopy } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useUserActions } from "@/hooks/useUserActions";

import api from "@/utils/api";
import _ from "lodash";

export const formatTimestamp = (date: string | Date) => {
  const parsedDate = new Date(date);
  const isRecent = differenceInDays(new Date(), parsedDate) < 1;

  if (isRecent)
    return formatDistance(parsedDate, new Date(), { addSuffix: true });
  return format(parsedDate, "MMM dd, yyyy • HH:mm 'UTC'");
};

const UserCard = ({
  userData,
  postDate,
  link,
  showSignInModal,
  totalData,
  reportPost,
}: any) => {
  const formattedDate = `Published on: ` + formatTimestamp(postDate);
  const { isMobile } = useDeviceCheck();
  const [userDetail, setUserDetail] = useState<any>();
  const { isLoading, handleFollow } = useUserActions({
    showSignInModal,
  });

  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const fetchUserDetail = async () => {
    const response = await api.get(
      `/user/profile?user_id=${userData.user_name}`
    );
    setUserDetail(response.data);
  };
  const follow = async () => {
    const success = await handleFollow(userDetail.id, userDetail?.is_following);
    if (success) {
      await fetchUserDetail();
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 mb-4 "
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-row w-full justify-start gap-6">
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
                  className="object-cover"
                  width={isMobile ? 65 : 85}
                  shadow="lg"
                  style={
                    isMobile
                      ? { height: "65px", width: "65px" }
                      : { height: "85px", width: "85px" }
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

          <div className="flex flex-col justify-between w-full">
            <div className="flex justify-between w-full items-start">
              <h1 className="text-xl font-bold">{userData.first_name}</h1>
              <Popover
                showArrow
                offset={10}
                placement="bottom"
                backdrop="transparent"
              >
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                    radius="full"
                    variant="light"
                    onPress={() => console.log(userData)}
                  >
                    <PiDotsThreeOutlineVerticalFill size={17} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px]">
                  {() => (
                    <div className="px-1 py-2 w-full flex flex-col gap-2">
                      <Button
                        startContent={<MdOutlineContentCopy size={24} />}
                        variant="ghost"
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
                        variant="ghost"
                        startContent={<MdReport size={24} />}
                        onPress={reportPost}
                      >
                        {totalData.reported_me ? "UnReport" : "Report"}
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col">
              {/* {userData.about_me && (
                <Tooltip
                  className="max-w-[80%]"
                  placement="right-end"
                  content={
                    (userData.about_me as String).length > 150 && (
                      <div className="px-1 py-2 ">
                        <div className="text-xs md:text-small font-semibold">
                          {userData.about_me}
                        </div>
                      </div>
                    )
                  }
                  isDisabled={(userData.about_me as string).length <= 100}
                >
                  <span className="text-xs md:text-medium">
                    {_.truncate(userData.about_me, {
                      length: isMobile ? 35 : 150,
                      omission: "...",
                    })}
                  </span>
                </Tooltip>
              )} */}
              <span className="text-md font-semibold text-gray-500">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
