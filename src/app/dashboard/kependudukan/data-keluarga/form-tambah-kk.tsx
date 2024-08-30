"use client";

import { Input } from "@/components/Form/Input";
import { kkActions } from "@/server/actions";
import { KKFormSchema } from "@/server/actions/formschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";

function FormTambahPenduduk() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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

    const success = await kkActions.tambahDataKK(formData);
    reset();
    if (success) alert("Data berhasil ditambahkan");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nomor Kartu Keluarga"
        {...register("kk_id")}
        error={errors.kk_id?.message}
        required
      />
      <Button type="submit" className="btn-primary btn-sm">
        {isSubmitting ? "Loading..." : "Tambah Data"}
      </Button>
    </Form>
  );
}

export default FormTambahPenduduk;
