"use client";

import React, { useEffect, useState } from "react";
import LogoSmall from "@/images/logo-small.png";
import LogoDark from "@/images/logo-dark-small.png";
import SimpleBar from "simplebar-react";
import menu, { Menu, SubMenuItem } from "../menu/MenuData";
import classNames from "classnames";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import Link from "next/link";
import UserAvatar from "@/components/user/UserAvatar";
import { LinkList, LinkItem } from "@/components/links/Links";
import Icon from "@/components/icon/Icon";
import { useTheme, useThemeUpdate } from "../provider/Theme";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavsideProps {
  setCurrentMenuTab: (menuTab: string) => void;
}

const Navside: React.FC<NavsideProps> = ({ setCurrentMenuTab }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const pathname = usePathname();

  const [menuTab, setMenuTab] = useState<string>("Dashboards");
  const [isOpen, setOpen] = useState<boolean>(false);

  const checkMenuUrl = (data: Menu): SubMenuItem | undefined => {
    if (!data.subMenu) return undefined;
    for (const node of data.subMenu) {
      if (node.link === window.location.pathname) {
        return node;
      } else {
        const newNode = node.subMenu ? checkMenuUrl(node) : undefined;
        if (newNode) return newNode;
      }
    }
  };

  useEffect(() => {
    let found;
    menu.forEach((item) => {
      found = checkMenuUrl(item);
      if (found !== undefined) {
        setMenuTab(item.heading ?? "Invalid Menu");
      }
    });
  }, [pathname]);

  useEffect(() => {
    setCurrentMenuTab(menuTab);
  }, [menuTab, setCurrentMenuTab]);

  const appSidebarClass = classNames({
    "nk-sidebar-bar": true,
    [`is-light`]: theme.sidenav === "white",
    [`is-${theme.sidenav}`]:
      theme.sidenav !== "white" && theme.sidenav !== "light",
  });

  return (
    <div className={appSidebarClass}>
      <div className="nk-apps-brand">
        <Link href={`/`} legacyBehavior>
          <div className="logo-link">
            <Image className="logo-light logo-img" src={LogoSmall} alt="logo" />
            <Image
              className="logo-dark logo-img"
              src={LogoDark}
              alt="logo-dark"
            />
          </div>
        </Link>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-body">
          <SimpleBar className="nk-sidebar-content">
            <div className="nk-sidebar-menu">
              <ul className="nk-menu apps-menu">
                {menu.map((item, index) => {
                  if (item.heading !== "Components") {
                    return (
                      <React.Fragment key={index}>
                        <li
                          className={`nk-menu-item ${
                            item.heading === menuTab ? "active" : ""
                          }`}
                          key={index}
                          id={"page" + index}
                        >
                          <Link href="#link" legacyBehavior>
                            <a
                              onClick={(ev) => {
                                ev.preventDefault();
                                setMenuTab(item.heading ?? "Invalid Menu");
                              }}
                              className="nk-menu-icon nk-menu-link nk-menu-switch"
                            >
                              <Icon name={item.icon}></Icon>
                            </a>
                          </Link>
                        </li>
                      </React.Fragment>
                    );
                  } else return null;
                })}
                <li className="nk-menu-hr"></li>
                <li
                  className={`nk-menu-item ${
                    "Components" === menuTab ? "active" : ""
                  }`}
                  id="componentTooltip"
                >
                  <Link href="#link" legacyBehavior>
                    <a
                      className="nk-menu-icon nk-menu-link nk-menu-switch"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setMenuTab("Components");
                      }}
                    >
                      <Icon name="layers"></Icon>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nk-sidebar-footer">
              <ul className="nk-menu nk-menu-md apps-menu">
                <li
                  className="nk-menu-item"
                  id="settingsTooltip"
                  onClick={themeUpdate.sidebarVisibility}
                >
                  <Link href={`/user-profile-setting`} legacyBehavior>
                    <a className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <Icon name="setting"></Icon>
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </SimpleBar>
          <Dropdown
            isOpen={isOpen}
            toggle={() => setOpen(!isOpen)}
            className="nk-sidebar-profile nk-sidebar-profile-fixed"
            direction="end"
          >
            <DropdownToggle
              tag="a"
              href="#toggle"
              className="dropdown-toggle"
              onClick={(ev) => {
                ev.preventDefault();
              }}
            >
              <UserAvatar text="AB" theme="primary" />
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-md ms-4">
              <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                <div className="user-card sm">
                  <UserAvatar text="AB" theme="primary" />
                  <div className="user-info">
                    <span className="lead-text">Abu Bin Ishtiyak</span>
                    <span className="sub-text">info@softnio.com</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-inner" onClick={themeUpdate.sidebarHide}>
                <LinkList>
                  <LinkItem link="/user-profile-regular" icon="user-alt">
                    View Profile
                  </LinkItem>
                  <LinkItem link="/user-profile-setting" icon="setting-alt">
                    Account Setting
                  </LinkItem>
                  <LinkItem link="/user-profile-activity" icon="activity-alt">
                    Login Activity
                  </LinkItem>
                  <LinkItem
                    link="#"
                    icon={theme.skin === "dark" ? "moon" : "sun"}
                    onClick={(ev: any) => {
                      ev.preventDefault();
                      themeUpdate.skin(
                        theme.skin === "dark" ? "light" : "dark"
                      );
                    }}
                  >
                    {theme.skin === "dark" ? "Light Mode" : "Dark Mode"}
                  </LinkItem>
                </LinkList>
              </div>
              <div className="dropdown-inner">
                <LinkList>
                  <LinkItem link="/api/auth/signout" icon="signout">
                    Sign Out
                  </LinkItem>
                </LinkList>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navside;
