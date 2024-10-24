"use server";

import { prisma } from "@/lib/db";
import { PendudukFormSchema } from "@/actions/formschemas";
import { DataPendudukFormSchemaInputType } from "./formschemas/pendudukSchemas";
export async function tambahDataPenduduk(
  data: DataPendudukFormSchemaInputType & { urutan?: number | null }
) {
  try {
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

    // tidak mungkin terjadi
    if (!parsed.success || !parsed.data) {
      // Lempar error jika parsing gagal
      throw new Error("Data tidak valid: " + JSON.stringify(parsed.error));
    }

    await prisma.$transaction(async (prisma) => {
      // Cek apakah kartu keluarga sudah ada
      const penduduk_kartu_keluarga =
        await prisma.penduduk_kartu_keluarga.findFirst({
          where: {
            nomor_kk: parsed.data.kk_id,
          },
        });

      let newKK = !penduduk_kartu_keluarga;

      // Buat kartu keluarga baru jika belum ada
      if (newKK) {
        await prisma.penduduk_kartu_keluarga.create({
          data: {
            nomor_kk: parsed.data.kk_id,
          },
        });
      }

      // Tentukan urutan penduduk dalam kartu keluarga
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

      // Set sebagai kepala keluarga jika kartu keluarga baru
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
  } catch (error: any) {
    // Lempar error agar bisa ditangkap oleh toast.promise
    throw new Error(`Gagal menambahkan data penduduk: ${error.message}`);
  }
}
