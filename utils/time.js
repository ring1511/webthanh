import moment from "moment-timezone";

export const getTime = () => {
  const nowInUTC7 = moment().tz("Asia/Ho_Chi_Minh");
  const Milliseconds = nowInUTC7.valueOf();
  const date = nowInUTC7.format();
  return { date, Milliseconds };
};
