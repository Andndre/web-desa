import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import Link from "next/link";
import Icon from "@/components/icon/Icon";

const AppDropdown = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <Dropdown isOpen={open} toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#dropdown"
        onClick={(ev) => ev.preventDefault()}
        className="dropdown-toggle nk-quick-nav-icon"
      >
        <div className="icon-status icon-status-na">
          <Icon name="menu-circled"></Icon>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-lg">
        <div className="dropdown-body">
          <ul className="list-apps">
            <li>
              <Link href={`/`} onClick={toggle} legacyBehavior>
                <span className="list-apps-media">
                  <Icon
                    name="dashlite"
                    className="bg-primary text-white"
                  ></Icon>
                </span>
                <span className="list-apps-title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href={`/app-chat`} onClick={toggle} legacyBehavior>
                <span className="list-apps-media">
                  <Icon name="dashlite" className="bg-info-dim"></Icon>
                </span>
                <span className="list-apps-title">Chats</span>
              </Link>
            </li>
            <li>
              <Link href={`/app-messages`} onClick={toggle} legacyBehavior>
                <span className="list-apps-media">
                  <Icon name="dashlite" className="bg-success-dim"></Icon>
                </span>
                <span className="list-apps-title">Messages</span>
              </Link>
            </li>
            <li>
              <Link href={`/app-calender`} onClick={toggle} legacyBehavior>
                <span className="list-apps-media">
                  <Icon name="dashlite" className="bg-danger-dim"></Icon>
                </span>
                <span className="list-apps-title">Calender</span>
              </Link>
            </li>
            <li>
              <Link href={`/components`} onClick={toggle} legacyBehavior>
                <span className="list-apps-media">
                  <Icon name="dashlite" className="bg-secondary-dim"></Icon>
                </span>
                <span className="list-apps-title">Components</span>
              </Link>
            </li>
          </ul>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AppDropdown;
