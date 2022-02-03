import * as moment from "moment";

export const getRangeOfDates = (checkIn, checkOut, dateFormat = "Y/MM/DD") => {
  const tempDates = [];
  const mEndAt = moment(checkOut);
  let mStartAt = moment(checkIn);

  while (mStartAt < mEndAt) {
    tempDates.push(mStartAt.format(dateFormat));
    mStartAt = mStartAt.add(1, "day");
  }

  tempDates.push(mEndAt.format(dateFormat));

  return tempDates;
};
