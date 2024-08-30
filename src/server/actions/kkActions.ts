"use server";

import { prisma } from "@/lib/db";
import { KKFormSchema } from "@/server/actions/formschemas";

export async function tambahDataKK(formData: FormData) {
  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => (data[key] = value));
  const parsed = await KKFormSchema.tambahDataKKSchema.safeParseAsync(data);

  if (parsed.success && parsed.data) {
    await prisma.penduduk_kartu_keluarga.create({
      data: {
        nomor_kk: parsed.data.kk_id,
      },
    });

    return true;
  }

  console.error("Parse error: " + parsed.error);

  return false;
}
