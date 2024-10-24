"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface ClientSessionProviderProps {
  children: React.ReactNode;
  session: any;
}

const ClientSessionProvider: React.FC<ClientSessionProviderProps> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientSessionProvider;
