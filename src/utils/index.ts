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
