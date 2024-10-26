import * as pendudukData from "./pendudukData";
import * as kartuKeluargaData from "./kartuKeluargaData";

export type PendudukData = Awaited<ReturnType<typeof pendudukData.getDataPenduduk>>;
export type PendudukDataRow = PendudukData[number];

export type KeluargaData = Awaited<ReturnType<typeof kartuKeluargaData.getDataKeluarga>>;
export type KeluargaDataRow = KeluargaData[number];

export type ReturnTypeItemAsync<
  T extends (page: number, perPage: number, ...args: any[]) => Promise<any[]>
> = Awaited<ReturnType<T>>[number];
