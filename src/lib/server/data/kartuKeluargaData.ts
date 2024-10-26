"use server";

import { prisma } from "@/lib/server/db";
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

export type ReturnTypeOfGetDataKeluarga = Awaited<
  ReturnType<typeof getDataKeluarga>
>[number];

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

export async function getDetailKartuKeluarga(
  page: number,
  perPage: number,
  nomor_kk: string
) {
  return await prisma.penduduk.findMany({
    where: {
      kk_id: nomor_kk,
    },
    orderBy: {
      urutan: "asc",
    },
    include: {
      hubungan: true,
      status_dasar: true,
      status: true,
      status_kawin: true,
      cacat: true,
      golongan_darah: true,
      agama: true,
      suku: true,
      sakit_menahun: true,
      pekerjaan: true,
      pendidikan: true,
    },
  });
}

export type ReturnTypeOfGetDetailKartuKeluarga = Awaited<
  ReturnType<typeof getDetailKartuKeluarga>
>;

export type ReturnTypeOfGetDetailKartuKeluargaItem =
  ReturnTypeOfGetDetailKartuKeluarga[number];

export async function getDetailKartuKeluargaTotal(nomor_kk: string) {
  return await prisma.penduduk.count({
    where: {
      kk_id: nomor_kk,
    },
  });
}

export async function applyUrutan(dataNew: ReturnTypeOfGetDetailKartuKeluarga) {
  await prisma.$transaction(async (tx) => {
    // update kepala keluarga ke anggota keluarga teratas
    const p = await tx.penduduk.findUnique({
      where: {
        nik: dataNew[0].nik,
      },
      select: {
        kk_id: true,
      },
    });
    // if not found, cancel transaction
    if (!p) return;
    await tx.penduduk_kartu_keluarga.update({
      where: {
        nomor_kk: p.kk_id,
      },
      data: {
        nik_kepala_keluarga: dataNew[0].nik,
      },
    });
    // update urutan
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
