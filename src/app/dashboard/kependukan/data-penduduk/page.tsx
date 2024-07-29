import { auth } from "@/auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default async function () {
  const session = await auth();
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Data Penduduk" />
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
