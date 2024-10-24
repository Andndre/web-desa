"use client";

import { useSession } from "next-auth/react";

export default function () {
  const session = useSession();
  return (
    <div className="mx-auto max-w-242.5">
      <h1 className="nk-block-title page-title">Dashboard</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
