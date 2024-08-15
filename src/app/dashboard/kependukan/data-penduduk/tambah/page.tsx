import Form from "./form";
import { pendudukData } from "@/server/data";

export default async function TambahPendudukPage() {
  const masters = await pendudukData.getMasters();
  return (
    <div className="mx-auto max-w-242.5">
      <Form masters={masters} />
    </div>
  );
}
