"use client";

import React, { useState } from "react";
import Sidebar from "@/layout/admin/sidebar/Sidebar";
import Header from "@/layout/admin/header/Header";
import Footer from "@/layout/admin/footer/Footer";
import AppMain from "@/layout/global/AppMain";
import AppWrap from "@/layout/global/AppWrap";
import AppRoot from "@/layout/global/AppRoot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppRoot className="has-sidebar">
        <Sidebar fixed />
        <AppMain>
          <AppWrap>
            <Header fixed />
            {children}
            <Footer />
          </AppWrap>
        </AppMain>
      </AppRoot>
    </>
  );
};

export default Layout;
