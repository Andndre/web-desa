"use server";

import { prisma } from "@/lib/db";
import { PendudukFormSchema } from "@/server/actions/formschemas";

export async function tambahDataPenduduk(formData: FormData) {
  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => (data[key] = value));

  const maxUrutan = await prisma.penduduk.findFirst({
    orderBy: {
      urutan: "desc",
    },
    select: {
      urutan: true,
    },
  });

  data.urutan = maxUrutan?.urutan ? maxUrutan.urutan + 1 : 1;
  const parsed = PendudukFormSchema.tambahDataPendudukSchema.safeParse(data);

  if (parsed.success && parsed.data) {
    await prisma.$transaction(async (prisma) => {
      // create penduduk_kartu_keluarga if kk_id not exist
      const penduduk_kartu_keluarga =
        await prisma.penduduk_kartu_keluarga.findFirst({
          where: {
            nomor_kk: parsed.data.kk_id,
          },
        });

      let newKK = !penduduk_kartu_keluarga;

      if (newKK) {
        await prisma.penduduk_kartu_keluarga.create({
          data: {
            nomor_kk: parsed.data.kk_id,
          },
        });
      }

      // set urutan penduduk
      const maxUrutan = await prisma.penduduk.findFirst({
        where: {
          kk_id: parsed.data.kk_id,
        },
        orderBy: {
          urutan: "desc",
        },
        select: {
          urutan: true,
        },
      });

      await prisma.penduduk.create({
        data: {
          ...parsed.data,
          urutan: maxUrutan?.urutan ? maxUrutan.urutan + 1 : 1,
        },
      });

      // set as kepala keluarga
      if (newKK) {
        await prisma.penduduk_kartu_keluarga.update({
          where: {
            nomor_kk: parsed.data.kk_id,
          },
          data: {
            nik_kepala_keluarga: parsed.data.nik,
          },
        });
      }
    });

    return true;
  }

  console.error("Parse error: " + parsed.error);

  return false;
}
