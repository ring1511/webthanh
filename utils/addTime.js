export const addTime = (time) => {
  const inputDate = new Date(time);
  const futureDate = new Date(inputDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const offset = 7 * 60;
  const utc7Date = new Date(futureDate.getTime() + offset * 60 * 1000);

  const formattedDate = utc7Date.toISOString().replace("T", " ").slice(0, 19);

  return formattedDate;
};
