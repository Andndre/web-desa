"use client";

import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/layout/admin/provider/Theme";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};
