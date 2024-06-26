import { type ClassValue, clsx } from "clsx";
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
