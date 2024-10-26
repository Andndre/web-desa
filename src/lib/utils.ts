import { Menu, SubMenuItem } from "@/lib/components/layout/admin/menu/MenuData";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const checkMenuUrl = (
  data: Menu,
  pathname: string
): SubMenuItem | undefined => {
  if (!data.subMenu) return undefined;
  for (const node of data.subMenu) {
    if (node.link === pathname) {
      return node;
    } else {
      const newNode = node.subMenu ? checkMenuUrl(node, pathname) : undefined;
      if (newNode) return newNode;
    }
  }
};

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
