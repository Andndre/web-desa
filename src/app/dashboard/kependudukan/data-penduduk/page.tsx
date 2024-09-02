import { pendudukData } from "@/server/data";
import DataPendudukPage from "./data-penduduk";

export type Masters = Awaited<ReturnType<typeof pendudukData.getMasters>>;

async function PendudukPage() {
  const masters: Masters = await pendudukData.getMasters();
  return <DataPendudukPage masters={masters} />;
}

export default function Page() {
  return <PendudukPage />;
}
