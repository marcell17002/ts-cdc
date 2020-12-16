export const getChatTime = (date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
};
