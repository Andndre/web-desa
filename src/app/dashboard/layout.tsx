"use server";

import Layout from "@/layout/admin/Index";
import { ToastContainer } from "react-toastify";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Layout>{children}</Layout>
      <ToastContainer />
    </>
  );
}
