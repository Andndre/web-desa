"use server";

import { prisma } from "@/lib/db";
import { PendudukFormSchema } from "@/app/formschemas";

export async function tambahDataPenduduk(formData: FormData) {
  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => (data[key] = value));

  const parsed = PendudukFormSchema.tambahDataPendudukSchema.safeParse(data);

  if (parsed.success) {
    await prisma.penduduk.create({
      data: parsed.data!,
    });
    return true;
  }

  console.log(parsed.error);
  return false;
}
