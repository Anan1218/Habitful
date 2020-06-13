
const formatDateString = date => {
  let dateString = "";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  dateString += year + "-";
  if (month < 10) {
    dateString += "0";
  }
  dateString += month + "-";
  if (day < 10) {
    dateString += "0";
  }
  dateString += day;
  return dateString;
};

export default formatDateString;
