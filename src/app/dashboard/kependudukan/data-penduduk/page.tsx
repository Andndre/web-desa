import { getMasters } from "@/server/data/pendudukData";
import DataPendudukPage from "./data-penduduk";
import Providers from "./providers";

export default async function Page() {
  const masters = await getMasters();
  return (
    <Providers>
      <DataPendudukPage masters={masters} />
    </Providers>
  );
}
