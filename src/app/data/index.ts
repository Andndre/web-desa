"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getDataPenduduk(
  searchPage?: number,
  searchTake?: number
) {
  const take = searchTake ? searchTake : 10;
  const page = searchPage ? searchPage : 1;
  const penduduk = await prisma.penduduk.findMany({
    take,
    skip: (page - 1) * take,
  });
  return penduduk;
}

export async function getDataKeluarga(
  searchPage?: number,
  searchTake?: number
) {
  const take = searchTake ? searchTake : 10;
  const page = searchPage ? searchPage : 1;
  const keluarga = await prisma.penduduk_kartu_keluarga.findMany({
    take,
    skip: (page - 1) * take,
  });
  return keluarga;
}

export async function createDataPenduduk(insert: Prisma.pendudukCreateInput) {
  // kk harus dibuat dulu
  // jika nik sudah ada, maka error
  await prisma.penduduk.create({
    data: insert,
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
