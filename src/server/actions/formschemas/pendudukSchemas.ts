import { JenisKelamin } from "@prisma/client";
import { z } from "zod";

export const tambahDataPendudukSchema = z.object({
  nama: z.string().trim().min(1, { message: "Nama harus diisi" }),
  nik: z
    .string()
    .trim()
    .length(16, { message: "NIK harus terdiri dari 16 digit" }),
  jenis_kelamin: z.nativeEnum(JenisKelamin, {
    message: "Jenis kelamin harus diisi",
  }),
  tempat_lahir: z.string().min(1, { message: "Tempat lahir harus diisi" }),
  tanggal_lahir: z
    .string()
    .pipe(z.coerce.date({ message: "Tanggal lahir harus diisi" })),
  agama_id: z.string().pipe(z.coerce.number()),
  kk_id: z
    .string()
    .length(16, { message: "Nomor KK harus terdiri dari 16 digit" }),
  // .refine(
  //   async (kk_id) => {
  //     return await isKartuKeluargaExists(kk_id);
  //   },
  //   {
  //     message: "Nomor KK tidak ditemukan dalam sistem",
  //   }
  // ),
  alamat: z.string(),
  cacat_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Disabilitas harus diisi" })),
  hubungan_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Hubungan harus diisi" })),
  golongan_darah_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Golongan darah harus diisi" })),
  sakit_menahun_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Sakit menahun harus diisi" })),
  pekerjaan_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Pekerjaan harus diisi" })),
  pendidikan_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Pendidikan harus diisi" })),
  nomor_akta_lahir: z.string({ message: "Nomor akta lahir harus diisi" }),
  status_dasar_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Status dasar harus diisi" })),
  status_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Status harus diisi" })),
  suku_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Suku harus diisi" })),
  status_kawin_id: z
    .string()
    .pipe(z.coerce.number().min(1, { message: "Status kawin harus diisi" })),
  telepon: z.string(),
});

export type DataPendudukFormSchemaInputType = z.input<
  typeof tambahDataPendudukSchema
>;
export type DataPendudukFormSchemaOutputType = z.output<
  typeof tambahDataPendudukSchema
>;

export const tambahDataPendudukTanpaKKSchema = tambahDataPendudukSchema.omit({kk_id: true});

export type DataPendudukTanpaKKFormSchemaInputType = z.input<typeof tambahDataPendudukTanpaKKSchema>;
export type DataPendudukTanpaKKFormSchemaOutputType = z.output<typeof tambahDataPendudukTanpaKKSchema>;
