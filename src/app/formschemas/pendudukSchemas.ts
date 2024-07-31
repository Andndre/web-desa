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
    .min(16, { message: "Nomor KK harus terdiri dari 16 digit" })
    .max(16, { message: "Nomor KK harus terdiri dari 16 digit" }),
  alamat: z.string(),
  cacat_id: z
    .string()
    .pipe(z.coerce.number({ message: "Disabilitas harus diisi" })),
  hubungan_id: z
    .string()
    .pipe(z.coerce.number({ message: "Hubungan harus diisi" })),
  golongan_darah_id: z
    .string()
    .pipe(z.coerce.number({ message: "Golongan darah harus diisi" })),
  sakit_menahun_id: z
    .string()
    .pipe(z.coerce.number({ message: "Sakit menahun harus diisi" })),
  pekerjaan_id: z
    .string()
    .pipe(z.coerce.number({ message: "Pekerjaan harus diisi" })),
  pendidikan_id: z
    .string()
    .pipe(z.coerce.number({ message: "Pendidikan harus diisi" })),
  nomor_akta_lahir: z.string(),
  status_dasar_id: z.string().pipe(z.coerce.number()),
  status_id: z.string().pipe(z.coerce.number()),
  suku_id: z.string().pipe(z.coerce.number()),
  status_kawin_id: z.string().pipe(z.coerce.number()),
  telepon: z.string(),
});

export type DataPendudukFormSchemaInputType = z.input<
  typeof tambahDataPendudukSchema
>;
export type DataPendudukFormSchemaOutputType = z.output<
  typeof tambahDataPendudukSchema
>;
