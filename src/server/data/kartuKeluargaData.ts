"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function isKartuKeluargaExists(noKK: string) {
  return !!(await prisma.penduduk_kartu_keluarga.findFirst({
    where: {
      nomor_kk: noKK,
    },
  }));
}

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
    take: 10,
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

export async function getDataKeluarga(page: number, take: number) {
  return await prisma.penduduk_kartu_keluarga.findMany({
    include: {
      kepala_keluarga: {
        select: {
          nama: true,
        },
      },
    },
    skip: (page - 1) * take,
    take,
  });
}

export async function getTotalKeluarga() {
  return await prisma.penduduk_kartu_keluarga.count();
}

export async function getDetailKartuKeluarga(nomor_kk: string) {
  return await prisma.penduduk_kartu_keluarga.findUnique({
    where: {
      nomor_kk: nomor_kk,
    },
    include: {
      penduduk: true,
      kepala_keluarga: true,
    },
  });
}

export type DetailKartuKeluargaResponse = Exclude<
  Awaited<ReturnType<typeof getDetailKartuKeluarga>>,
  null
>;

export async function applyUrutan(dataNew: DetailKartuKeluargaResponse["penduduk"]) {
  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < dataNew.length; i++) {
      await tx.penduduk.update({
        where: {
          nik: dataNew[i].nik,
        },
        data: {
          urutan: dataNew[i].urutan,
        },
      });
    }
  });
}
