"use server";

import { prisma } from "../db";

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
