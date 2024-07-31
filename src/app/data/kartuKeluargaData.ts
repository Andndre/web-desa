"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function searchKartuKeluarga(noKK: string) {
  return await prisma.penduduk_kartu_keluarga.findMany({
    where: {
      nomor_kk: {
        startsWith: noKK,
      },
    },
    select: {
      nomor_kk: true,
      kepala_keluarga: {
        select: {
          nama: true,
        },
      },
    },
    take: 10
  });
}

export async function createKartuKeluarga(
  insert: Prisma.penduduk_kartu_keluargaCreateInput
) {
  // jika kk sudah ada, maka error
  await prisma.penduduk_kartu_keluarga.create({
    data: insert,
  });
}

export async function updateKepalaKeluargaKartuKeluarga(
  nomor_kk: string,
  nik_kepala_keluarga: string
) {
  // jika kk tidak ada, maka error
  await prisma.penduduk_kartu_keluarga.update({
    where: {
      nomor_kk,
    },
    data: {
      nik_kepala_keluarga,
    },
  });
}
