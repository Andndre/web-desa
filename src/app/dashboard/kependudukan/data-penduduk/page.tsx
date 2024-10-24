import { getMasters } from "@/server/data/pendudukData";
import DataPendudukPage from "./data-penduduk";

export type Masters = Awaited<ReturnType<typeof getMasters>>;

async function PendudukPage() {
  const masters: Masters = await getMasters();
  return <DataPendudukPage masters={masters} />;
}

export default function Page() {
  return <PendudukPage />;
}
