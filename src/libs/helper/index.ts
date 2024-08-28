import dayjs from "dayjs";
import Cookies from "js-cookie";

/* eslint-disable no-useless-escape */
export const encodeStringtoURI = (str: string) => {
  const replaceStr = str.replace(/[,\s]/g, "-");
  return encodeURIComponent(replaceStr);
};

export const convertSlugURL = (str: string) => {
  str = str.toLowerCase();
  return (str = str
    .normalize("NFD")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[\u0300-\u036f\u1EA0-\u1EF9\u1E00-\u1EFF]/g, "")
    .replace(/[ \[\]()\-\/,.]/g, "-")
    .replace(/-+/g, "-")
    .replace(/-+$/, ""));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSearchParams = (searchParams: any) => {
  const searchQuery = [];

  for (const key in searchParams) {
    if (searchParams[key]) {
      let value = searchParams[key];

      if (Array.isArray(value)) {
        value = value.join(",");
      }

      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);

      searchQuery.push(`${encodedKey}=${encodedValue}`);
    }
  }
  return searchQuery.join("&");
};

export const convertTimeToDisplayFormat = (timeString: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hours, minutes, second] = timeString.split(":").map(Number);
  second;
  if (!isNaN(hours)) {
    let displayTime = `${hours}h`;

    if (!isNaN(minutes)) {
      if (minutes < 10) {
        if (minutes === 0) return displayTime;
        displayTime += `0${minutes}p`;
      } else {
        displayTime += `${minutes}p`;
      }
    }

    return displayTime;
  }

  return "Invalid time format";
};

export const resetAuthStore = () => {
  Cookies.remove("badminton-rft");
  Cookies.remove("badminton-at");
  sessionStorage.removeItem("badminton-session");
};

export const numberToPrice = (num: number): string => {
  if (!num) return "0đ";

  const numStr: string = num.toString();

  const formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";

  return formattedStr;
};

export const formatTime = (dateTime: string | undefined | Date) => {
  if (!dateTime) return '';

  return dayjs(dateTime).format('HH:mm')
}

export const formatDate = (dateTime: string | undefined | Date) => {
  if (!dateTime) return '';

  return dayjs(dateTime).format('DD/MM/YYYY')
}

export const formatDateTime = (dateTime: string | undefined | Date) => {
  if (!dateTime) return '';

  return dayjs(dateTime).format('DD/MM/YYYY HH:mm')
}

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

export const getRandomInt = (min = 6, max = 20) => {
  return String(Math.floor(Math.random() * (max - min + 1)) + min).padStart(2, '0');
}
