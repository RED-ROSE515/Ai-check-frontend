import React from "react";
import { Card, CardBody, Image, Tooltip, Slider } from "@heroui/react";
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

const UserCard = ({ userData, postDate }: any) => {
  const formattedDate = formatTimestamp(postDate);
  const { isMobile } = useDeviceCheck();
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 mb-4"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-row w-full justify-start gap-6">
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
              {userData.about_me && (
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
              )}
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
