import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TableData = Date | string | { nama: string } | undefined;

export function renderData(data: TableData) {
  return data instanceof Date
    ? data.toLocaleDateString()
    : typeof data === "object"
    ? data?.nama || "Belum Diatur"
    : String(data);
}

export function renderKey(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}
