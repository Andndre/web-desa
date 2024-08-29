"use client";

import React, { useState } from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Menu from "@/layout/admin/menu/Menu";
import Navside from "@/layout/admin/navside/Navside";

import { useTheme, useThemeUpdate } from "@/layout/admin/provider/Theme";

const Sidebar = ({
  fixed,
  className,
}: {
  fixed?: boolean;
  className?: string;
}) => {
  const [currentMenuTab, setCurrentMenuTab] = useState("Dashboards");
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const mainClass = classNames({
    "nk-sidebar-main": true,
    [`is-light`]: theme.sidebar === "white",
    [`is-${theme.sidebar}`]:
      theme.sidebar !== "white" && theme.sidebar !== "light",
    [`${className}`]: className,
  });

  const compClass = classNames({
    "nk-sidebar": true,
    "nk-sidebar-fixed": fixed,
    "nk-sidebar-mobile": theme.sidebarMobile,
    "nk-sidebar-active": theme.sidebarVisibility && theme.sidebarMobile,
  });

  return (
    <>
      <div className={compClass}>
        {loading && (
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              background: "white",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <>
          <Navside
            setCurrentMenuTab={setCurrentMenuTab}
            setLoading={() => setLoading(false)}
          />
          <div className={mainClass}>
            <SimpleBar className="nk-sidebar-inner">
              <Menu
                mobileView={false}
                sidebarToggle={themeUpdate.sidebarVisibility}
                currentMenuTab={currentMenuTab}
              />
            </SimpleBar>
          </div>
        </>
      </div>
      {theme.sidebarVisibility && (
        <div
          onClick={themeUpdate.sidebarVisibility}
          className="nk-sidebar-overlay"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
