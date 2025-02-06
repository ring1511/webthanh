export const format = (amount) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatNumber = (number) => {
  return number.toLocaleString("vi-VN");
};

export const formatStatus = (status) => {
  return status === "inactive"
    ? "Chưa kích hoạt"
    : status === "ban"
    ? "Bị cấm"
    : "Hoạt động";
};

export const formatDate = (date) => {
  const sentDate = new Date(date);
  const currentDate = new Date();
  const differenceInMilliseconds = sentDate - currentDate;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  const remainingDays = Math.floor(differenceInDays);
  return date === null ? "Không xác định" : remainingDays + " ngày";
};
