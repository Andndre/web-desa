"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import menu, { type SubMenuItem } from "./MenuData";
import Icon from "@/lib/components/icon/Icon";
import classNames from "classnames";
import Toggle from "@/lib/components/layout/admin/sidebar/Toggle";

import { useThemeUpdate } from "../provider/Theme";
import { usePathname } from "next/navigation";

interface MenuSubProps extends SubMenuItem {
  sidebarToggle?: (e: React.MouseEvent) => void;
  mobileView?: boolean;
  style?: React.CSSProperties;
}

interface MenuProps {
  currentMenuTab: string;
  sidebarToggle: (e: React.MouseEvent) => void;
  mobileView: boolean;
}

const MenuItem: React.FC<MenuSubProps> = ({
  icon,
  link = "",
  text,
  subMenu,
  newTab,
  sidebarToggle,
  mobileView,
  badge,
}) => {
  let currentUrl = usePathname();
  const toggleActionSidebar = (e: React.MouseEvent) => {
    if (!subMenu && !newTab && mobileView && sidebarToggle) {
      sidebarToggle(e);
    }
  };

  const menuHeight = React.useCallback((el: HTMLElement[]): number => {
    const totalHeight = el.reduce((acc, element) => {
      const margin =
        parseInt(window.getComputedStyle(element).marginTop) +
        parseInt(window.getComputedStyle(element).marginBottom);
      const padding =
        parseInt(window.getComputedStyle(element).paddingTop) +
        parseInt(window.getComputedStyle(element).paddingBottom);
      const height = element.clientHeight + margin + padding;
      return acc + height;
    }, 0);
    return totalHeight;
  }, []);

  const makeParentActive = React.useCallback(
    (el: HTMLElement, childHeight: number = 0) => {
      const element = el.parentElement?.parentElement
        ?.parentElement as HTMLElement;
      const wrap = el.parentElement?.parentElement as HTMLElement;
      if (element?.classList.contains("nk-menu-item")) {
        element.classList.add("active");
        const subMenuHeight = menuHeight(
          Array.from(el.parentNode?.children ?? []) as HTMLElement[]
        );
        wrap.style.height = `${subMenuHeight + childHeight - 50}px`;
        makeParentActive(element);
      }
    },
    [menuHeight]
  );

  useEffect(() => {
    const elements = document.getElementsByClassName(
      "nk-menu-item active current-page"
    );
    const arrayElement = Array.from(elements) as HTMLElement[];

    arrayElement.forEach((dom) => {
      const parentElement = dom.parentElement?.parentElement?.parentElement;
      if (parentElement?.classList.contains("nk-menu-item")) {
        parentElement.classList.add("active");
        const subMenuHeight = menuHeight(
          Array.from(dom.parentNode?.children ?? []) as HTMLElement[]
        );
        (
          dom.parentElement?.parentElement as HTMLElement
        ).style.height = `${subMenuHeight}px`;
        makeParentActive(parentElement, subMenuHeight);
      }
    });
  }, [menuHeight, makeParentActive]);

  const menuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const self = (e.target as HTMLElement).closest(
      ".nk-menu-toggle"
    ) as HTMLElement;
    const parent = self.parentElement as HTMLElement;
    const subMenu = self.nextElementSibling as HTMLElement;
    const subMenuItem = Array.from(subMenu.childNodes) as HTMLElement[];
    const parentSiblings = Array.from(
      parent.parentElement?.childNodes || []
    ) as HTMLElement[];
    const parentMenu = parent.closest(".nk-menu-wrap") as HTMLElement;

    const subMenuHeight = menuHeight(subMenuItem);

    const getParents = (el: HTMLElement, parentSelector?: HTMLElement) => {
      if (!parentSelector) {
        parentSelector = document.querySelector("#main-menu") as HTMLElement;
      }
      const parents = [];
      let p = el.parentNode as HTMLElement;
      while (p !== parentSelector) {
        parents.push(p);
        p = p.parentNode as HTMLElement;
      }
      parents.push(parentSelector);
      return parents;
    };

    const parentMenus = getParents(self);

    if (!parent.classList.contains("active")) {
      parentSiblings.forEach((sibling) => {
        sibling.classList.remove("active");
        const child = sibling.childNodes[1] as HTMLElement;
        if (child) child.style.height = "0";
      });

      if (parentMenu && !parentMenu.classList.contains("sub-opened")) {
        parentMenu.classList.add("sub-opened");
        parentMenus.forEach((menu) => {
          if (menu.classList.contains("nk-menu-wrap")) {
            menu.style.height = `${subMenuHeight + menu.clientHeight}px`;
          }
        });
      }

      parent.classList.add("active");
      subMenu.style.height = `${subMenuHeight}px`;
    } else {
      parent.classList.remove("active");
      if (parentMenu) {
        parentMenu.classList.remove("sub-opened");
        parentMenus.forEach((menu) => {
          if (menu.classList.contains("nk-menu-wrap")) {
            menu.style.height = `${menu.clientHeight - subMenuHeight}px`;
          }
        });
      }
      subMenu.style.height = "0";
    }
  };

  const menuItemClass = classNames({
    "nk-menu-item": true,
    "has-sub": subMenu,
    "active current-page": currentUrl === link,
  });

  return (
    <li className={menuItemClass} onClick={toggleActionSidebar}>
      {newTab ? (
        <Link href={link} target="_blank" legacyBehavior>
          <a className="nk-menu-link" rel="noopener noreferrer">
            {icon && (
              <span className="nk-menu-icon">
                <Icon name={icon} />
              </span>
            )}
            <span className="nk-menu-text">{text}</span>
          </a>
        </Link>
      ) : (
        <Link href={link} legacyBehavior>
          <a
            className={`nk-menu-link${subMenu ? " nk-menu-toggle" : ""}`}
            onClick={subMenu ? menuToggle : undefined}
          >
            {icon && (
              <span className="nk-menu-icon">
                <Icon name={icon} />
              </span>
            )}
            <span className="nk-menu-text">{text}</span>
            {badge && <span className="nk-menu-badge">{badge}</span>}
          </a>
        </Link>
      )}
      {subMenu && (
        <div className="nk-menu-wrap">
          <MenuSub
            text=""
            subMenu={subMenu}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        </div>
      )}
    </li>
  );
};

const MenuSub: React.FC<MenuSubProps> = ({
  subMenu,
  sidebarToggle,
  mobileView,
  ...props
}) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {subMenu?.map((item) => (
        <MenuItem
          link={item.link}
          icon={item.icon}
          text={item.text}
          subMenu={item.subMenu}
          key={item.text}
          badge={item.badge}
          newTab={item.newTab}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

const Menu: React.FC<MenuProps> = ({
  currentMenuTab,
  sidebarToggle,
  mobileView,
}) => {
  const themeUpdate = useThemeUpdate();
  const menuItem = menu.find((item) => item.heading === currentMenuTab);

  return (
    <div className="nk-menu-content menu-active">
      <div className="d-flex justify-between">
        <h5 className="title mt-1">{menuItem?.heading}</h5>
        <div className="mb-1">
          <Toggle
            icon="arrow-left"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            click={themeUpdate.sidebarVisibility}
          />
        </div>
      </div>
      <ul className="nk-menu" id="main-menu">
        {menuItem?.subMenu?.map((item) => (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            newTab={item.newTab}
            text={item.text}
            subMenu={item.subMenu}
            badge={item.badge}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
