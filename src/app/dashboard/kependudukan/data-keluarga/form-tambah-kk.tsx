"use client";

import { Input } from "@/lib/components/Form/Input";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "reactstrap";
import { tambahDataKK } from "@/actions/kkActions";
import { DataKKFormSchemaInputType } from "@/actions/formschemas/keluargaSchemas";
import { useFormSubmit } from "@/hooks/form";
import { TableKeluargaContext } from "./providers";

function FormTambahPenduduk() {
  const {
    dataTable: { fetchData },
    setShowOffcanvas,
  } = useContext(TableKeluargaContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormSubmit<DataKKFormSchemaInputType>(async (data, setError) => {
    await toast.promise(tambahDataKK(data), {
      pending: "Menambahkan data kartu keluarga...",
      success: {
        async render() {
          await fetchData();
          setShowOffcanvas(false);
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
