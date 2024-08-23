import * as pendudukData from "./pendudukData";
export { pendudukData };
export * as kartuKeluargaData from "./kartuKeluargaData";

export type PendudukData = Awaited<ReturnType<typeof pendudukData.getDataPenduduk>>;
export type PendudukDataRow = PendudukData[number];
