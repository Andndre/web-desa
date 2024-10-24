import React from "react";
import Sidebar from "@/layout/admin/sidebar/Sidebar";
import Header from "@/layout/admin/header/Header";
import Footer from "@/layout/admin/footer/Footer";
import AppMain from "@/layout/global/AppMain";
import AppWrap from "@/layout/global/AppWrap";
import AppRoot from "@/layout/global/AppRoot";
import { redirect } from "next/navigation";
import AppContent from "../global/AppContent";
import { getServerSession } from "next-auth";
import ClientSessionProvider from "./ClientSessionProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    return redirect("/auth/signin");
  }
  return (
    <>
      <ClientSessionProvider session={session}>
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
      </ClientSessionProvider>
    </>
  );
};

export default Layout;
