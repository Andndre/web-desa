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
    await prisma.penduduk.create({
      data: parsed.data,
    });
    return true;
  }
  
  console.error("Parse error: " + parsed.error);

  return false;
}
