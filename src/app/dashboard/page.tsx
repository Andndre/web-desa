"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSession } from "next-auth/react";

export default function () {
  const { data: session } = useSession();
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Beranda" />
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
