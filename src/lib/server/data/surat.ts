"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/db";

export async function getTotalSuratTemplate() {
  return await prisma.surat_template.count();
}

export async function getSuratTemplate(page: number, take: number) {
  return await prisma.surat_template.findMany({
    skip: (page - 1) * take,
    take,
  });
}

export async function getSuratTemplateFields(id: number) {
  return await prisma.komponen_surat.findMany({
    where: {
      template_id: id,
    },
  });
}

export async function createSuratTemplateField(
  data: Prisma.komponen_suratCreateInput
) {
  return await prisma.komponen_surat.create({ data });
}

export async function saveSuratTemplateField(
  data: Prisma.komponen_suratUpdateInput[]
) {
  return await prisma.komponen_surat.updateMany({ data });
}

export async function deleteSuratTemplateField(id: number) {
  return await prisma.komponen_surat.deleteMany({ where: { id } });
}
