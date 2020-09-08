import { setDay, format, subDays, addDays } from "date-fns";

// TODO: Want monday of previous week, not 7 days back
const getFirstDateOfPreviousWeek = () => subDays(new Date(), 7);

export const getCurrentWeekDayId = (weekDay: number) => {
  return format(setDay(new Date(), weekDay), "yyyyMMdd");
};

export const getFirstDayOfPreviousWeek = () => {
  return format(getFirstDateOfPreviousWeek(), "yyyyMMdd");
};

export const getDaysOfPreviousWeek = () => {
  return new Array(7)
    .fill(0)
    .map((_, index) =>
      format(addDays(getFirstDateOfPreviousWeek(), index), "yyyyMMdd")
    );
};
