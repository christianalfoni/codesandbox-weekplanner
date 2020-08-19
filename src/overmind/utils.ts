import { setDay, format } from "date-fns";

export const getCurrentWeekDayId = (weekDay: number) => {
  return format(setDay(new Date(), weekDay), "yyyyMMdd");
};
