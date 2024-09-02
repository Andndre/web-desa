"use client";

import { Input } from "@/components/Form/Input";
import { kkActions } from "@/server/actions";
import { KKFormSchema } from "@/server/actions/formschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "reactstrap";

export interface IFormTambahPenduduk {
  toggleDrawer: () => void;
}

function FormTambahPenduduk({ toggleDrawer }: IFormTambahPenduduk) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KKFormSchema.DataKKFormSchemaInputType>({
    resolver: zodResolver(KKFormSchema.tambahDataKKSchema, {}, { raw: true }),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<
    KKFormSchema.DataKKFormSchemaInputType
  > = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(
        key,
        data[key as keyof KKFormSchema.DataKKFormSchemaInputType]
      );
    }

    await toast.promise(kkActions.tambahDataKK(formData), {
      pending: "Menambahkan data kartu keluarga...",
      success: {
        render() {
          toggleDrawer();
          return "Kartu Keluarga berhasil ditambahkan";
        },
      },
      error: {
        render() {
          return "Terjadi kesalahan saat menambahkan Kartu Keluarga";
        },
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nomor Kartu Keluarga"
        {...register("kk_id")}
        error={errors.kk_id?.message}
        required
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
