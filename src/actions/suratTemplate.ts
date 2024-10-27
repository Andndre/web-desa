"use server";

import { prisma } from "@/lib/server/db";
import { InputType } from "./formschemas/suratTemplateSchema";

export async function tambahDataSuratTemplate(data: InputType) {
  try {
    const template = await prisma.surat_template.create({
      data,
    });
    return template;
  } catch {
    throw new Error("Gagal menambahkan template surat");
  }
}
