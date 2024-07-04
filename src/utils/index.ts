"use client"
import { tablecolors } from "@/Constants";

export const getRandomColor = (usedcolors: string[]): string | undefined => {
  const availableColors = tablecolors.filter(
    (color) => !usedcolors.includes(color)
  );

  if (availableColors.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
  }

  // Return undefined if no available colors are left
  return undefined;
};

export const getColumnId = (name1: string, name2: string) => {
  return `${name1}^^${name2}`;
};

export const concatString = (characters: number, string: string) => {
  if (string?.length >= characters) {
    return `${string.substring(0, characters)}...`;
  }
  return string;
};

export function generateUID(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < length; i++) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uid;
}

export function getTimeAgo(timestamp: string) {
  const now = new Date();
  const past = new Date(timestamp);
  const elapsed = now - past;

  // Convert elapsed time to seconds
  const seconds = Math.floor(elapsed / 1000);

  // Define time intervals
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // Calculate time differences
  if (seconds > intervals.year) {
    return "" + Math.floor(seconds / intervals.year) + " year ago";
  } else if (seconds > intervals.month) {
    return "" + Math.floor(seconds / intervals.month) + " month ago";
  } else if (seconds > intervals.day) {
    return "" + Math.floor(seconds / intervals.day) + " day ago";
  } else if (seconds > intervals.hour) {
    return "" + Math.floor(seconds / intervals.hour) + " hour ago";
  } else if (seconds > intervals.minute) {
    return "" + Math.floor(seconds / intervals.minute) + " minute ago";
  } else {
    return "just now";
  }
}


/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
const generateURL = (payload: Record<string, any>): string => {
  let url = '';

  // remove searchValue if it's empty
  if (payload.searchValue === '') {
    delete payload.searchValue;
  }

  if (payload.startDate === null || payload.startDate === undefined) {
    delete payload.startDate;
  }

  if (payload.endDate === null || payload.endDate === undefined) {
    delete payload.endDate;
  }

  if (payload.sort === '') {
    delete payload.sort;
  }

  // remove null values if removeNull is true
  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (value === null || value === 'undefined' || value === '') {
        delete payload[key];
      }
    }
  }

  for (const [key, value] of Object.entries(payload)) {
    url += `&${key}=${value}`;
  }

  return url;
};

export default generateURL;

export function setCookie(name: string, value: string, daysToExpire: number) {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
export function getCookie(name: string) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Function to delete a cookie
export function deleteCookie(name: any) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
