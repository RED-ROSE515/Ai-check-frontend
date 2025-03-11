import { formatDistance, format, differenceInDays } from "date-fns";

export const formatTimestamp = (date: string | Date) => {
  const parsedDate = new Date(date);
  const isRecent = differenceInDays(new Date(), parsedDate) < 1;

  if (isRecent)
    return formatDistance(parsedDate, new Date(), { addSuffix: true });
  return format(parsedDate, "MMM dd, yyyy • HH:mm 'UTC'");
};
