"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}
