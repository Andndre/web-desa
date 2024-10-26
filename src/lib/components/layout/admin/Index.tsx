import React from "react";
import Sidebar from "@/lib/components/layout/admin/sidebar/Sidebar";
import Header from "@/lib/components/layout/admin/header/Header";
import Footer from "@/lib/components/layout/admin/footer/Footer";
import AppMain from "@/lib/components/layout/global/AppMain";
import AppWrap from "@/lib/components/layout/global/AppWrap";
import AppRoot from "@/lib/components/layout/global/AppRoot";
import { redirect } from "next/navigation";
import AppContent from "../global/AppContent";
import { getServerSession } from "next-auth";
import ClientSessionProvider from "./ClientSessionProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession();
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
