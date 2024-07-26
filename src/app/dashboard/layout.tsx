"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { signIn, useSession } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    signIn();
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}
