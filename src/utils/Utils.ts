//Function to validate and return errors for a form
export const checkForm = (formData: FormData) => {
  let errorState = {};
  Object.keys(formData).forEach((item) => {
    const value = formData.get(item);
    if (value === null || value === "") {
      formData.set(item, "This field is required");
    }
  });
  return errorState;
};

//Function that returns the first or first two letters from a name
export const findUpper = (string: string) => {
  let extractedString = [];

  for (var i = 0; i < string.length; i++) {
    if (
      string.charAt(i) === string.charAt(i).toUpperCase() &&
      string.charAt(i) !== " "
    ) {
      extractedString.push(string.charAt(i));
    }
  }
  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

//Function that calculates the from current date
export const setDeadline = (days: number) => {
  let todayDate = new Date();
  var newDate = new Date(todayDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Function to structure date ex : Jun 4, 2011;
export const getDateStructured = (date: Date) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  let final = monthNames[m] + " " + d + ", " + y;
  return final;
};

const twoDigits = (num: number) => {
  return num < 10 ? "0" + num : num;
}

// Function to structure date ex: YYYY-MM-DD
export const setDateForPicker = (rdate: Date) => {
  let d = rdate.getDate();
  let m = rdate.getMonth() + 1;
  let y = rdate.getFullYear();
  const rdateString = y + "-" + twoDigits(m) + "-" + twoDigits(d);

  return rdateString;
};

// Set deadlines for projects
export const setDeadlineDays = (deadline: Date) => {
  var currentDate = new Date();
  var difference = deadline.getTime() - currentDate.getTime();
  var days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

//Date formatter function
export const dateFormatterAlt = (date: Date, reverse: boolean) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  let dateString = "";
  reverse
    ? (dateString = m + "-" + d + "-" + y)
    : (dateString = y + "-" + d + "-" + m);
  return dateString;
};

//Date formatter function
export const dateFormatter = (
  date: string,
  reverse: boolean,
  string: string
) => {
  var dateformat = date.split("-");
  //var date = dateformat[1]+"-"+dateformat[2]+"-"+dateformat[0];
  reverse
    ? (date = dateformat[2] + "-" + dateformat[0] + "-" + dateformat[1])
    : (date = dateformat[1] + "-" + dateformat[2] + "-" + dateformat[0]);

  return date;
};

//todays Date
export const todaysDate = new Date();

//current Time
export const currentTime = () => {
  let hours = todaysDate.getHours();
  let minutes = todaysDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

//Percentage calculation
export const calcPercentage = (str1: string, str2: string) => {
  let result = Number(str2) / Number(str1);
  result = result * 100;
  return Math.floor(result);
};

export const truncate = (str: string, n: number): string => {
  return str.length > n
    ? str.substring(0, n - 1) +
        " " +
        truncate(str.substring(n - 1, str.length), n)
    : str;
};

// returns upload url
export const getUploadParams = () => {
  return { url: "https://httpbin.org/post" };
};

export const bulkActionOptions = [
  { value: "suspend", label: "Suspend User" },
  { value: "delete", label: "Delete User" },
];

// Converts KB to MB
export const bytesToMegaBytes = (bytes: number) => {
  let result = bytes / (1024 * 1024);
  return result.toFixed(2);
};

export const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
