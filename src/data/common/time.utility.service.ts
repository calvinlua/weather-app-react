export const getCurrentTime = () => {
  const date = new Date();
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();
  let isAmPm: string = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let strCurrentTime = hours + ":" + minutes + ":" + seconds + isAmPm;
  return strCurrentTime;
};

export const getCurrentTimeWithDate = () => {
  let todayDate: Date = new Date(Date.now());
  let year: number = todayDate.getFullYear();
  let month: number | string =
    todayDate.getMonth() + 1 < 10
      ? "0" + todayDate.getMonth() + 1
      : todayDate.getMonth() + 1;
  let day: number | string =
    todayDate.getDate() < 10 ? "0" + todayDate.getDate() : todayDate.getDate();
  const todayDateAndTime: string =
    day + "-" + month + "-" + year + " " + getCurrentTime();

  return todayDateAndTime;
};
