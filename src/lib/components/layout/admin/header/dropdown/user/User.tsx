import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { LinkList, LinkItem } from "@/lib/components/links/Links";
import UserAvatar from "@/lib/components/user/UserAvatar";
import {
  useTheme,
  useThemeUpdate,
} from "@/lib/components/layout/admin/provider/Theme";

const User = () => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    themeUpdate.sidebarHide();
    setOpen((prevState) => !prevState);
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <UserAvatar icon="user-alt" className="sm" />
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">Abu Bin Ishtiyak</span>
              <span className="sub-text">info@softnio.com</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem
              link="/user-profile-regular"
              icon="user-alt"
              onClick={toggle}
            >
              View Profile
            </LinkItem>
            <LinkItem
              link="/user-profile-setting"
              icon="setting-alt"
              onClick={toggle}
            >
              Account Setting
            </LinkItem>
            <LinkItem
              link="/user-profile-activity"
              icon="activity-alt"
              onClick={toggle}
            >
              Login Activity
            </LinkItem>
            <LinkItem
              link="#"
              icon={theme.skin === "dark" ? "moon" : "sun"}
              onClick={(ev: any) => {
                ev.preventDefault();
                themeUpdate.skin(theme.skin === "dark" ? "light" : "dark");
              }}
            >
              {theme.skin === "dark" ? "Light Mode" : "Dark Mode"}
            </LinkItem>
            {/* <a
                className={`dark-switch ${
                  theme.skin === "dark" ? "active" : ""
                }`}
                href="#"
                onClick={(ev) => {
                  ev.preventDefault();
                  themeUpdate.skin(theme.skin === "dark" ? "light" : "dark");
                }}
              >
                {theme.skin === "dark" ? (
                  <>
                    <em className="icon ni ni-sun"></em>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <em className="icon ni ni-moon"></em>
                    <span>Dark Mode</span>
                  </>
                )}
              </a> */}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/api/auth/signout" icon="signout" onClick={toggle}>
              Sign Out
            </LinkItem>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
