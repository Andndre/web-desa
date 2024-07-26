"use server";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}
