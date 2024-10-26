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

export type ReturnTypeOfGetSuratTemplate = Awaited<
  ReturnType<typeof getSuratTemplate>
>;
export type ReturnTypeOfGetSuratTemplateItem =
  ReturnTypeOfGetSuratTemplate[number];
