"use client";

import { useSession } from "next-auth/react";

export default function () {
  const session = useSession();
  return (
    <div className="mx-auto max-w-242.5">
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
