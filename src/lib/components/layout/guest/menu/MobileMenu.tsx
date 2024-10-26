import React, { useEffect, FC, useCallback } from "react";
import classNames from "classnames";
import Link from "next/link";
import Scroll from "react-scroll";

const ScrollLink = Scroll.Link;

interface MenuItemProps {
  icon?: string;
  link: string;
  text: string;
  sub?: MenuItemProps[];
  newTab?: boolean;
  sidebarToggle: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  mobileView: boolean;
  badge?: string;
}

interface MenuSubProps {
  sub: MenuItemProps[];
  sidebarToggle: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  mobileView: boolean;
  style?: React.CSSProperties;
}

interface MobileMenuProps {
  data: MenuItemProps[];
  sidebarToggle: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  mobileView: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  icon,
  link,
  text,
  sub,
  newTab,
  sidebarToggle,
  mobileView,
  badge,
}) => {
  let currentUrl: string | null;

  if (typeof window !== "undefined" && window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }

  const toggleActionSidebar = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (!sub && !newTab && mobileView) {
      sidebarToggle(e);
    }
  };

  const menuHeight = useCallback((el: HTMLElement[]) => {
    const totalHeight = el.map((element) => {
      const margin =
        parseInt(window.getComputedStyle(element).marginTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(element).marginBottom.slice(0, -2));
      const padding =
        parseInt(window.getComputedStyle(element).paddingTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(element).paddingBottom.slice(0, -2));
      return element.clientHeight + margin + padding + 3;
    });
    return totalHeight.reduce((sum, value) => sum + value, 0);
  }, []);

  const makeParentActive = useCallback(
    (el: HTMLElement, childHeight: number) => {
      const element = el.parentElement?.parentElement
        ?.parentElement as HTMLElement;
      const wrap = el.parentElement?.parentElement as HTMLElement;
      if (element && element.classList[0] === "menu-item") {
        element.classList.add("active");
        const subMenuHeight = menuHeight(
          Array.from((el.parentNode?.children || []) as HTMLElement[])
        );
        if (wrap) {
          wrap.style.height = subMenuHeight + childHeight - 50 + "px";
        }
        makeParentActive(element, subMenuHeight);
      }
    },
    [menuHeight]
  );

  useEffect(() => {
    const elements = document.getElementsByClassName(
      "menu-item active current-page"
    );
    const arrayElement = Array.from(elements);

    arrayElement.forEach((dom) => {
      const parentElement = dom.parentElement?.parentElement
        ?.parentElement as HTMLElement;
      if (parentElement && parentElement.classList[0] === "menu-item") {
        parentElement.classList.add("active");
        const subMenuHeight = menuHeight(
          Array.from((dom.parentNode?.children || []) as HTMLElement[])
        );
        (dom.parentElement?.parentElement as HTMLElement).style.height =
          subMenuHeight + "px";
        makeParentActive(
          dom.parentElement?.parentElement as HTMLElement,
          subMenuHeight
        );
      }
    });
  }, [link, currentUrl, makeParentActive, menuHeight]);

  const menuItemClass = classNames({
    "menu-item": true,
    "has-sub": sub,
    "active current-page": currentUrl === process.env.NEXT_PUBLIC_URL + link,
  });

  return (
    <li className={menuItemClass} onClick={(e) => toggleActionSidebar(e)}>
      {link.startsWith("#") ? (
        <ScrollLink to={link} spy={true} smooth={true} className="menu-link">
          <span className="menu-text">{text}</span>
        </ScrollLink>
      ) : (
        <Link
          href={process.env.NEXT_PUBLIC_URL + link}
          className={`menu-link${sub ? " menu-toggle" : ""}`}
          legacyBehavior
        >
          <span className="menu-text">{text}</span>
        </Link>
      )}
      {sub ? (
        <div className="menu-wrap">
          <MenuSub
            sub={sub}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        </div>
      ) : null}
    </li>
  );
};

const MenuSub: FC<MenuSubProps> = ({
  sub,
  sidebarToggle,
  mobileView,
  ...props
}) => {
  return (
    <ul className="menu-sub" style={props.style}>
      {sub.map((item, i) => (
        <MenuItem
          key={i}
          link={item.link}
          icon={item.icon}
          text={item.text}
          sub={item.sub}
          badge={item.badge}
          newTab={item.newTab}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

const MobileMenu: FC<MobileMenuProps> = ({
  data,
  sidebarToggle,
  mobileView,
}) => {
  return (
    <ul className="menu-list ms-lg-auto">
      {data.map((item) => (
        <MenuItem
          key={item.text}
          link={item.link}
          text={item.text}
          sub={item.sub}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

export default MobileMenu;
