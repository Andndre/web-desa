import React from "react";
import Sidebar from "@/lib/components/layout/admin/sidebar/Sidebar";
import Header from "@/lib/components/layout/admin/header/Header";
import Footer from "@/lib/components/layout/admin/footer/Footer";
import AppMain from "@/lib/components/layout/global/AppMain";
import AppWrap from "@/lib/components/layout/global/AppWrap";
import AppRoot from "@/lib/components/layout/global/AppRoot";
import AppContent from "../global/AppContent";
import { SessionProvider } from "@/hooks/ClientSessionProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <SessionProvider>
        <AppRoot className="has-sidebar">
          <Sidebar fixed />
          <AppMain>
            <AppWrap>
              <Header fixed />
              <AppContent>{children}</AppContent>
              <Footer />
            </AppWrap>
          </AppMain>
        </AppRoot>
      </SessionProvider>
    </>
  );
};

export default Layout;
