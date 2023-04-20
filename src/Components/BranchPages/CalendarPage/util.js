import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

// export function getWeek(date = dayjs()) {
//   const weekStart = date.startOf('week');
//   const daysMatrix = new Array(1).fill([]).map(() => {
//     return new Array(7).fill(null).map((_, index) => {
//       return dayjs(weekStart).add(index, 'day');
//     });
//   });
//   return daysMatrix;
// }
export function getWeek(offset = 0) {
  const weekStart = dayjs().startOf('week').add(offset * 7, 'day');
  const daysMatrix = new Array(1).fill([]).map(() => {
    return new Array(7).fill(null).map((_, index) => {
      return dayjs(weekStart).add(index, 'day');
    });
  });
  return daysMatrix;
}

/**
 * Generate text to display the date range for the given week
 * @param {dayjs.Dayjs} weekStart - Start date of the week
 * @returns {string} Text to display
 */
export const getWeekDisplayText = (weekStart) => {
  const weekEnd = weekStart.add(6, "day");
  const weekStartStr = weekStart.format("MMM DD");
  const weekEndStr = weekEnd.format("DD");
  return `${weekStartStr} - ${weekEndStr}, ${weekStart.year()}`;
};
/**
 * Generate all days in a week
 * @param {dayjs.Dayjs} currentDate - Any date in the week
 * @returns {array} days - All days in the week with date, dateStamp and weekDayName
 */
export const getAllDaysInTheWeek = (currentDate = dayjs()) => {
  const weekStart = currentDate.startOf('week');

  const days = Array.from(Array(7))
    .map((day, index) => index)
    .map((day) =>
      dayjs(weekStart).add(day, 'days').set('minutes', 0).set('seconds', 0)
    )
    .map((dayjsObj) => ({
      date: dayjsObj.date(),
      dateStamp: +dayjsObj,
      weekDayName: dayjsObj.format('ddd'),
    }));

  return days;
};

// All the hours in the day
export const times = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];



export const generateWeekViewCoordinates = (weekStart, daysDiff) => {
  const coordinates = [];
  const start = dayjs(weekStart, 'YYYY-MM-DD');
  const end = start.add(daysDiff, 'day');
  const duration = end.diff(start, 'day');

  for (let i = 0; i <= duration; i++) {
    const currentDate = start.add(i, 'day');
    const isToday = isTodaysDate(currentDate);

    const top = isToday ? 52.5 : 50;
    const left = (currentDate.day() - 1) * 12.5 + 2;
    const width = (daysDiff + 1) * 12.5 - 2;

    coordinates.push({
      date: currentDate.format('YYYY-MM-DD'),
      top,
      left,
      width,
    });
  }

  return coordinates;
};



/**
 * Checks if the dateStamp represents today's date
 * @param {string} dateStamp - Date Stamp to check in 'YYYY-MM-DD' format
 * @return {boolean}
 */
export const isTodaysDate = dateStamp => {
  const today = dayjs();
  dateStamp = dayjs(dateStamp);
  return (
    dateStamp.isSame(today, 'day') &&
    today.day() === dateStamp.day()
  );
};