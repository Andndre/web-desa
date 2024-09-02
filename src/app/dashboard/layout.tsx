"use server";

import { auth } from "@/auth";
import Layout from "@/layout/admin/Index";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as {
    user: {
      name?: string;
      email: string;
      image?: string;
    };
  } | null;

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <Layout>
        {children}
      </Layout>
      <ToastContainer />
    </>
  );
}
