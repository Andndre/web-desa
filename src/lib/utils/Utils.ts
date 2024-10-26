import { Menu, SubMenuItem } from "@/lib/components/layout/admin/menu/MenuData";

export const truncate = (str: string, n: number): string => {
  return str.length > n
    ? str.substring(0, n - 1) +
        " " +
        truncate(str.substring(n - 1, str.length), n)
    : str;
};


/**
 * Recursively check if a given pathname matches with a Menu's link property.
 * @param data A Menu object which contains subMenu.
 * @param pathname The pathname to search in the Menu.
 * @returns The matched SubMenuItem or undefined if not found.
 */
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
