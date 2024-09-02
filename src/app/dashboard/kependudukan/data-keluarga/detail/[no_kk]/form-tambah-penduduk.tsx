"use client";

import { Input } from "@/components/Form/Input";
import { SelectType } from "@/components/Form/SelectType";
import { TextareaInput } from "@/components/Form/TextareaInput";
import { pendudukActions } from "@/server/actions";
import { PendudukFormSchema } from "@/server/actions/formschemas";
import { MastersType } from "@/server/data/pendudukData";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, Spinner } from "reactstrap";

export interface IFormTambahPenduduk {
  masters: MastersType;
  nomor_kk: string;
}

function FormTambahPenduduk({ masters, nomor_kk }: IFormTambahPenduduk) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PendudukFormSchema.DataPendudukTanpaKKFormSchemaInputType>({
    resolver: zodResolver(
      PendudukFormSchema.tambahDataPendudukTanpaKKSchema,
      {},
      { raw: true }
    ),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<
    PendudukFormSchema.DataPendudukTanpaKKFormSchemaInputType
  > = async (data) => {
    console.log("submitting");
    const formData = new FormData();

    for (const key in data) {
      formData.append(
        key,
        data[
          key as keyof PendudukFormSchema.DataPendudukTanpaKKFormSchemaInputType
        ]
      );
    }

    formData.append("kk_id", nomor_kk);

    const success = await pendudukActions.tambahDataPenduduk(formData);
    reset();
    if (success) {
      alert("Berhasil");
      // reload page
      window.location.reload();
    } else {
      alert("Gagal");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nama"
        {...register("nama")}
        error={errors.nama?.message}
        required
      />
      <Input
        label="NIK"
        {...register("nik")}
        error={errors.nik?.message}
        required
      />
      <SelectType
        label="Jenis Kelamin"
        {...register("jenis_kelamin")}
        error={errors.jenis_kelamin?.message}
        required
        options={[
          {
            nama: "Pria",
            id: "Pria",
          },
          {
            nama: "Wanita",
            id: "Wanita",
          },
        ]}
        setvalue={(value: string) => {
          setValue("jenis_kelamin", value as "Pria" | "Wanita", {
            shouldValidate: true,
          });
        }}
      />
      <Input
        label="Tanggal Lahir"
        {...register("tanggal_lahir")}
        error={errors.tanggal_lahir?.message}
        required
        type="date"
      />
      <Input
        label="Tempat Lahir"
        {...register("tempat_lahir")}
        error={errors.tempat_lahir?.message}
        required
      />
      <SelectType
        label="Agama"
        {...register("agama_id")}
        error={errors.agama_id?.message}
        required
        options={masters.agama}
        setvalue={(value: string) => {
          setValue("agama_id", value, { shouldValidate: true });
        }}
      />
      <TextareaInput
        label="Alamat"
        {...register("alamat")}
        error={errors.alamat?.message}
      />
      <SelectType
        label="Disabilitas"
        {...register("cacat_id")}
        error={errors.cacat_id?.message}
        required
        options={masters.disabilitas}
        setvalue={(value: string) => {
          setValue("cacat_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Hubungan"
        {...register("hubungan_id")}
        error={errors.hubungan_id?.message}
        required
        options={masters.hubungan}
        setvalue={(value: string) => {
          setValue("hubungan_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Golongan Darah"
        {...register("golongan_darah_id")}
        error={errors.golongan_darah_id?.message}
        required
        options={masters.golonganDarah}
        setvalue={(value: string) => {
          setValue("golongan_darah_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Sakit Menahun"
        {...register("sakit_menahun_id")}
        error={errors.sakit_menahun_id?.message}
        required
        options={masters.sakitMenahun}
        setvalue={(value: string) => {
          setValue("sakit_menahun_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Pekerjaan"
        {...register("pekerjaan_id")}
        error={errors.pekerjaan_id?.message}
        required
        options={masters.pekerjaan}
        setvalue={(value: string) => {
          setValue("pekerjaan_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Pendidikan"
        {...register("pendidikan_id")}
        error={errors.pendidikan_id?.message}
        required
        options={masters.pendidikan}
        setvalue={(value: string) => {
          setValue("pendidikan_id", value, { shouldValidate: true });
        }}
      />
      <Input
        label="Nomor Akta Kelahiran"
        {...register("nomor_akta_lahir")}
        error={errors.nomor_akta_lahir?.message}
        required
      />
      <SelectType
        label="Status Dasar"
        {...register("status_dasar_id")}
        error={errors.status_dasar_id?.message}
        required
        options={masters.statusDasar}
        setvalue={(value: string) => {
          setValue("status_dasar_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Status"
        {...register("status_id")}
        error={errors.status_id?.message}
        required
        options={masters.status}
        setvalue={(value: string) => {
          setValue("status_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Suku"
        {...register("suku_id")}
        error={errors.suku_id?.message}
        required
        options={masters.suku}
        setvalue={(value: string) => {
          setValue("suku_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Status Kawin"
        {...register("status_kawin_id")}
        error={errors.status_kawin_id?.message}
        required
        options={masters.statusKawin}
        setvalue={(value: string) => {
          setValue("status_kawin_id", value, { shouldValidate: true });
        }}
      />
      <Input
        label="Telepon"
        {...register("telepon")}
        error={errors.telepon?.message}
      />
      <Button
        type="submit"
        color="primary"
        disabled={isSubmitting}
        className="w-100 text-center d-flex align-items-center justify-content-center"
      >
        {isSubmitting ? <Spinner size="sm" color="light" /> : "Simpan"}
      </Button>
    </Form>
  );
}

export default FormTambahPenduduk;
