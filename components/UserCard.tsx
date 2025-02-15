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
import axios from "axios";
import { formatDistance, format, differenceInDays } from "date-fns";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import _ from "lodash";
const formatTimestamp = (date: string | Date) => {
  const parsedDate = new Date(date);
  const isRecent = differenceInDays(new Date(), parsedDate) < 1;

  if (isRecent) {
    return (
      `Published on: ` +
      formatDistance(parsedDate, new Date(), { addSuffix: true })
    );
  }

  return `Published on: ` + format(parsedDate, "MMM dd, yyyy • HH:mm 'UTC'");
};

export const UserTwitterCard = ({ userData, userDetail }: any) => {
  const [isFollowed, setIsFollowed] = React.useState(userDetail.is_following);

  return (
    <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={userData.avatar} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userData.first_name}
            </h4>
            <Link
              isExternal
              href={`https://uy7p3-zyaaa-aaaap-qpmoq-cai.icp0.io/@${userData.user_name}`}
              size="sm"
            >
              <h5 className="text-small tracking-tight text-blue-700">
                {`@` + userData.user_name}
              </h5>
            </Link>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200 ml-2"
              : "ml-2"
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
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
            {userDetail.count_following}
          </p>
          <p className=" text-default-500 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">
            {userDetail.count_followers}
          </p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

const UserCard = ({ userData, postDate }: any) => {
  const formattedDate = formatTimestamp(postDate);
  const { isMobile } = useDeviceCheck();
  const [userDetail, setUserDetail] = useState();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    const fetchUserDetail = async () => {
      const response = await axios.get(
        API_BASE_URL + `/user/profile?user_id=${userData.user_name}`
      );
      setUserDetail(response.data);
    };
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
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
              <div className="min-w-fit">
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
                  src={userData.avatar}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <UserTwitterCard userData={userData} userDetail={userDetail} />
            </PopoverContent>
          </Popover>

          <div className="flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h1 className="text-large font-bold">{userData.first_name}</h1>
              {/* <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => console.log(userData)}
              ></Button> */}
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
              <span className="text-sm font-bold text-gray-500">
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
