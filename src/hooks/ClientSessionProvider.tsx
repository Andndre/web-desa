"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Session } from "next-auth";
import Loader from "@/lib/components/common/Loader";

interface SessionContextType {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data: session, status } = useSession();
  const [cachedSession, setCachedSession] = useState(session);

  useEffect(() => {
    if (status === "authenticated") {
      setCachedSession(session);
    } else if (status === "unauthenticated") {
      setCachedSession(null);
      if (status === "unauthenticated") {
        signIn();
      }
    }
  }, [session, status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <SessionContext.Provider value={{ session: cachedSession, status }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useCachedSession = () => {
  return useContext(SessionContext);
};
