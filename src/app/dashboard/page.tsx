import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getServerSession } from "next-auth";

export default async function () {
  const session = await getServerSession();
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Beranda" />
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
