"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getTotalPenduduk() {
  return await prisma.penduduk.count();
}

export async function getDataPenduduk(
  searchPage: number,
  searchPerPage: number
) {
  const page = searchPage;
  const penduduk = await prisma.penduduk.findMany({
    skip: (page - 1) * searchPerPage,
    take: searchPerPage,
    select: {
      nama: true,
      nik: true,
      kk_id: true,
      jenis_kelamin: true,
      agama: {
        select: {
          nama: true,
        },
      },
      hubungan: {
        select: {
          nama: true,
        },
      },
      status: {
        select: {
          nama: true,
        },
      },
      cacat: {
        select: {
          nama: true,
        },
      },
      golongan_darah: {
        select: {
          nama: true,
        },
      },
      pekerjaan: {
        select: {
          nama: true,
        },
      },
      pendidikan: {
        select: {
          nama: true,
        },
      },
      status_kawin: {
        select: {
          nama: true,
        },
      },
      status_dasar: {
        select: {
          nama: true,
        },
      },
      sakit_menahun: {
        select: {
          nama: true,
        },
      },
      suku: {
        select: {
          nama: true,
        },
      },
      tempat_lahir: true,
      tanggal_lahir: true,
      alamat: true,
      telepon: true,
    },
  });
  return penduduk;
}

export async function createDataPenduduk(insert: Prisma.pendudukCreateInput) {
  // kk harus dibuat dulu
  // jika nik sudah ada, maka error
  await prisma.penduduk.create({
    data: insert,
  });
}

export async function getMasters() {
  const result = await prisma.$transaction(async (p) => {
    const [
      agama,
      disabilitas,
      golonganDarah,
      pekerjaan,
      pendidikan,
      hubungan,
      status,
      statusDasar,
      statusKawin,
      sakitMenahun,
      suku,
    ] = await Promise.all([
      p.master_agama.findMany(),
      p.master_disabilitas.findMany(),
      p.master_golongan_darah.findMany(),
      p.master_pekerjaan.findMany(),
      p.master_pendidikan.findMany(),
      p.master_penduduk_hubungan.findMany(),
      p.master_penduduk_status.findMany(),
      p.master_penduduk_status_dasar.findMany(),
      p.master_penduduk_status_kawin.findMany(),
      p.master_sakit_menahun.findMany(),
      p.master_suku.findMany(),
    ]);

    return {
      agama,
      disabilitas,
      golonganDarah,
      pekerjaan,
      pendidikan,
      hubungan,
      status,
      statusDasar,
      statusKawin,
      sakitMenahun,
      suku,
    };
  });

  return result;
}

export type MastersType = Awaited<ReturnType<typeof getMasters>>;
export type MasterType = MastersType[keyof MastersType];
