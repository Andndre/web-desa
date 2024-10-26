"use client";

import { Input } from "@/lib/components/Form/Input";
import { KKFormSchema } from "@/actions/formschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "reactstrap";
import { tambahDataKK } from "@/actions/kkActions";
import { DataKKFormSchemaInputType } from "@/actions/formschemas/keluargaSchemas";
import { useFormSubmit } from "@/hooks/form";

export interface IFormTambahPenduduk {
  toggleDrawer: () => void;
}

function FormTambahPenduduk({ toggleDrawer }: IFormTambahPenduduk) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormSubmit<DataKKFormSchemaInputType>(async (data, setError) => {
    await toast.promise(tambahDataKK(data), {
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
  });

  return (
    <Form onSubmit={handleSubmit()}>
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
