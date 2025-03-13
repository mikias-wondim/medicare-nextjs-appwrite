import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import confetti from "canvas-confetti";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
export const formatDateTime = (dateString: Date | string, timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
  const validTimeZone = (tz: string) => {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: tz }).format(new Date());
      return tz;
    } catch {
      return "UTC"; // Default to UTC if invalid
    }
  };

  const safeTimeZone = validTimeZone(timeZone);

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: safeTimeZone, // Use validated timezone
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: safeTimeZone,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
    timeZone: safeTimeZone,
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: safeTimeZone,
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString("en-US", dateTimeOptions);
  const formattedDateDay: string = new Date(dateString).toLocaleString("en-US", dateDayOptions);
  const formattedDate: string = new Date(dateString).toLocaleString("en-US", dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleString("en-US", timeOptions);

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};


export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const fireConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.5 },
    shapes: ["circle"],
    scalar: 1.2,
  });
};