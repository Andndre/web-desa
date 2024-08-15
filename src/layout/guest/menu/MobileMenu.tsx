import React, { useEffect, FC } from "react";
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

  const menuHeight = (el: HTMLElement[]): number => {
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
  };

  const makeParentActive = (el: HTMLElement, childHeight: number) => {
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
  };

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
  }, []);

  // const menuToggle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   e.preventDefault();
  //   const self = e.currentTarget.closest(".menu-toggle") as HTMLElement;
  //   const parent = self.parentElement as HTMLElement;
  //   const subMenu = self.nextSibling as HTMLElement;
  //   const subMenuItem = Array.from(subMenu.childNodes) as HTMLElement[];
  //   const parentSiblings = Array.from(
  //     parent.parentElement?.childNodes || []
  //   ) as HTMLElement[];
  //   const parentMenu = parent.closest(".menu-wrap") as HTMLElement;

  //   const subMenuHeight = menuHeight(subMenuItem);

  //   const getParents = (
  //     el: HTMLElement,
  //     parentSelector?: HTMLElement
  //   ): HTMLElement[] => {
  //     parentSelector = document.querySelector(".menu") as HTMLElement;
  //     if (!parentSelector) {
  //       parentSelector = document as HTMLElement;
  //     }
  //     const parents: HTMLElement[] = [];
  //     let p = el.parentNode as HTMLElement;
  //     while (p !== parentSelector) {
  //       const o = p;
  //       parents.push(o);
  //       p = o.parentNode as HTMLElement;
  //     }
  //     parents.push(parentSelector);
  //     return parents;
  //   };
  //   const parentMenus = getParents(self);

  //   if (!parent.classList.contains("active")) {
  //     for (let j = 0; j < parentSiblings.length; j++) {
  //       parentSiblings[j].classList.remove("active");
  //       if (typeof parentSiblings[j].childNodes[1] !== "undefined") {
  //         (parentSiblings[j].childNodes[1] as HTMLElement).style.height = "0";
  //       }
  //     }
  //     if (parentMenu && !parentMenu.classList.contains("sub-opened")) {
  //       parentMenu.classList.add("sub-opened");
  //       for (let l = 0; l < parentMenus.length; l++) {
  //         if (parentMenus[l]?.classList.contains("menu-wrap")) {
  //           parentMenus[l].style.height =
  //             subMenuHeight + parentMenus[l].clientHeight + "px";
  //         }
  //       }
  //     }
  //     parent.classList.add("active");
  //     subMenu.style.height = subMenuHeight + "px";
  //   } else {
  //     parent.classList.remove("active");
  //     if (parentMenu) {
  //       parentMenu.classList.remove("sub-opened");
  //       for (let k = 0; k < parentMenus.length; k++) {
  //         if (parentMenus[k]?.classList.contains("menu-wrap")) {
  //           parentMenus[k].style.height =
  //             parentMenus[k].clientHeight - subMenuHeight + "px";
  //         }
  //       }
  //     }
  //     subMenu.style.height = "0";
  //   }
  // };

  const menuItemClass = classNames({
    "menu-item": true,
    "has-sub": sub,
    "active current-page": currentUrl === process.env.NEXT_PUBLIC_URL + link,
  });

  return (
    <li className={menuItemClass} onClick={(e) => toggleActionSidebar(e)}>
      {link.startsWith("#") ? (
        <ScrollLink
          href={link}
          href="#"
          spy={true}
          smooth={true}
          className="menu-link"
        >
          <span className="menu-text">{text}</span>
        </ScrollLink>
      ) : (
        <Link
          href={process.env.NEXT_PUBLIC_URL + link}
          className={`menu-link${sub ? " menu-toggle" : ""}`}
          legacyBehavior>
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
