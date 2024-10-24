"use server";

import { prisma } from "@/lib/db";
import { DataKKFormSchemaInputType } from "./formschemas/keluargaSchemas";

export async function tambahDataKK(data: DataKKFormSchemaInputType) {
  await prisma.penduduk_kartu_keluarga.create({
    data: {
      nomor_kk: data.kk_id,
    },
  });
}
