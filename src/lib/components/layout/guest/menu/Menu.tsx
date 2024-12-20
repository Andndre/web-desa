"use client";

import React, { useState, FC } from "react";
import Scroll from "react-scroll";
import Link from "next/link";

const ScrollLink = Scroll.Link;

interface MenuItemProps {
  href: string;
  text: string;
  submenu?: MenuItemProps[];
}

interface MenuProps {
  data: MenuItemProps[];
  className?: string;
}

const Menu: FC<MenuProps> = ({ data, className }) => {
  return (
    <ul className={["menu-list", className ? className : ""].join(" ")}>
      {data.map((item, index) => (
        <MenuItem
          key={index}
          href={item.href}
          text={item.text}
          submenu={item.submenu}
        />
      ))}
    </ul>
  );
};

const MenuItem: FC<MenuItemProps> = ({ href, text, submenu }) => {
  const [active, setActive] = useState(false);

  return (
    <li
      className={[
        "menu-item",
        submenu ? "has-sub" : "",
        active ? "active" : "",
      ].join(" ")}
      onClick={() => (submenu ? setActive(!active) : null)}
    >
      <MenuLink href={href} submenu={submenu}>
        {text}
      </MenuLink>
      {submenu && <MenuSub submenu={submenu} active={active} />}
    </li>
  );
};

interface MenuLinkProps {
  href: string;
  submenu?: MenuItemProps[];
  children: React.ReactNode;
}

const MenuLink: FC<MenuLinkProps> = ({ href, submenu, children }) => {
  if (href.startsWith("#")) {
    return (
      <ScrollLink to={href} spy={true} smooth={true} className="menu-link">
        {children}
      </ScrollLink>
    );
  } else {
    if (submenu) {
      return (
        <Link
          href="toggle"
          onClick={(ev) => ev.preventDefault()}
          className="menu-link"
          legacyBehavior
        >
          {children}
        </Link>
      );
    } else {
      return (
        <Link href={href} className="menu-link" legacyBehavior>
          {children}
        </Link>
      );
    }
  }
};

interface MenuSubProps {
  submenu: MenuItemProps[];
  active: boolean;
}

const MenuSub: FC<MenuSubProps> = ({ submenu, active }) => {
  return (
    <div className="menu-sub" style={{ display: active ? "block" : "none" }}>
      <ul className="menu-list">
        {submenu.map((item, index) => (
          <MenuItem
            key={index}
            href={item.href}
            text={item.text}
            submenu={item.submenu}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
