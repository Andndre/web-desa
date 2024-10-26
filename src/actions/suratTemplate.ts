"use server";

import { prisma } from "@/lib/server/db";
import { InputType } from "./formschemas/suratTemplateSchema";

export async function tambahDataSuratTemplate(data: InputType) {
  return await prisma.surat_template.create({
    data,
  });
}
