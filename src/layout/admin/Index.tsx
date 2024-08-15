import React from "react";
import Sidebar from "@/layout/admin/sidebar/Sidebar";
import Header from "@/layout/admin/header/Header";
import Footer from "@/layout/admin/footer/Footer";
import AppRoot from "@/layout/global/AppRoot";
import AppMain from "@/layout/global/AppMain";
import AppWrap from "@/layout/global/AppWrap";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppRoot>
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
