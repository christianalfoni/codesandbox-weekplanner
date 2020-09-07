import { setDay, format, subDays } from "date-fns";

export const getCurrentWeekDayId = (weekDay: number) => {
  return format(setDay(new Date(), weekDay), "yyyyMMdd");
};

export const getFirstDayOfLastWeek = () => {
  return format(subDays(new Date(), 7), "yyyyMMdd");
};
