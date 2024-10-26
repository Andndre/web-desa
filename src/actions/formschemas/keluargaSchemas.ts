import { isKartuKeluargaExists } from "@/lib/server/data/kartuKeluargaData";
import { z } from "zod";

export const tambahDataKKSchema = z.object({
  kk_id: z
    .string()
    .length(16, { message: "Nomor KK harus terdiri dari 16 digit" })
    .refine(
      async (kk_id) => {
        return !(await isKartuKeluargaExists(kk_id));
      },
      {
        message: "Nomor KK sudah terdaftar pada sistem",
      }
    ),
});

export type DataKKFormSchemaInputType = z.input<typeof tambahDataKKSchema>;
export type DataKKFormSchemaOutputType = z.output<typeof tambahDataKKSchema>;
