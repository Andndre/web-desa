import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Form from "./form";
import { pendudukData } from "@/server/data";

export default async function TambahPendudukPage() {
  const masters = await pendudukData.getMasters();
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb
        pageName="Tambah Data Penduduk"
        description="Tambahkan Data Penduduk"
      />
      <Form masters={masters} />
    </div>
  );
}
