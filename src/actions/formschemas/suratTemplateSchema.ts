import { z } from "zod";

export const tambahSuratTemplateSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Nama template tidak boleh kosong" })
    .max(255, { message: "Nama template tidak boleh lebih dari 255 karakter" }),
});

export type InputType = z.input<typeof tambahSuratTemplateSchema>;

export type OutputType = z.output<typeof tambahSuratTemplateSchema>;
