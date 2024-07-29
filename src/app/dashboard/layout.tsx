"use server";

import { auth } from "@/auth";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}
