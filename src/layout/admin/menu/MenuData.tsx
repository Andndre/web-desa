export interface Menu {
  heading?: string;
  icon?: string;
  subMenu?: SubMenuItem[];
  badge?: string;
}

export interface SubMenuItem {
  text: string;
  link?: string;
  icon?: string;
  subMenu?: SubMenuItem[];
  badge?: string;
  active?: boolean;
  newTab?: boolean;
}

const menu: Menu[] = [
  {
    heading: "Pusat Data Desa",
    icon: "menu-circled",
    subMenu: [
      {
        text: "Data Penduduk",
        icon: "users-fill",
        link: "/dashboard/kependudukan/data-penduduk",
      },
      {
        text: "Data Keluarga",
        icon: "users-fill",
        link: "/dashboard/kependudukan/data-keluarga",
      },
    ],
  },
];

export default menu;
