import { PollOption } from "@/app/dashboard/components/poll";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(
  firstName?: string,
  lastName?: string,
): string | undefined {
  return firstName && lastName ? getInitials(firstName, lastName) : undefined;
}

export function getFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`;
}

export function getTimeDifference(timestamp: string) {
  const now = new Date();
  const diff = now.getTime() - new Date(`${timestamp}`).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""}`;
  } else if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  } else if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""}`;
  } else if (weeks < 5) {
    return `${weeks} week${weeks !== 1 ? "s" : ""}`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
}

export function isValidContent(s: string): boolean {
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1);
  }
  s = s.replace(/\\n/g, "\n");
  s = s.replace(/\s/g, "");

  return s === "";
}

export function validateTweet(tweet: string | undefined, isLoading: boolean) {
  return tweet === undefined || isValidContent(tweet) || isLoading;
}

export function validatePoll(
  options: PollOption[],
  isLoading: boolean,
  duration: string | undefined,
  tweet: string | undefined,
) {
  console.log(options, isLoading, duration, tweet);
  return (
    options.length < 2 ||
    isLoading ||
    duration == undefined ||
    tweet == undefined ||
    options.some((option) => option.value === "") ||
    duration === "" ||
    isValidContent(tweet)
  );
}

export const isVideo = (url: string) => {
  const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"]; // Add more video extensions if needed
  const extension = url.substring(url.lastIndexOf("."));
  return videoExtensions.includes(extension);
};
