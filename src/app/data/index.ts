"use server";

import { prisma } from "@/lib/db";

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
