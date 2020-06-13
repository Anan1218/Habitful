import formatDateString from "./formatDateString";

const createMarkedDates = (
  arrayName,
  datesDocs,
  newMarkedDates,
  color
) => {
  let formattedDateString;
  for (let date of datesDocs[0][arrayName]) {
    formattedDateString = formatDateString(date);
    newMarkedDates = {
      ...newMarkedDates,
      [formattedDateString]: { color: color }
    };
  }

  return newMarkedDates;
};

export default createMarkedDates;
