"use client";

import { Input } from "@/lib/components/Form/Input";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "reactstrap";
import { InputType } from "@/actions/formschemas/suratTemplateSchema";
import { useFormSubmit } from "@/hooks/form";
import { Context } from "./providers";
import { tambahDataSuratTemplate } from "@/actions/suratTemplate";

function FormTambah() {
  const {
    dataTable: { fetchData },
    setShowOffcanvas,
  } = useContext(Context)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormSubmit<InputType>(async (data, setError) => {
    await toast.promise(tambahDataSuratTemplate(data), {
      pending: "Menambahkan data kartu keluarga...",
      success: {
        async render() {
          await fetchData();
          setShowOffcanvas(false);
          return "Template Surat berhasil ditambahkan";
        },
      },
      error: {
        render() {
          return "Terjadi kesalahan saat menambahkan Template Surat";
        },
      },
    });
  });

  return (
    <Form onSubmit={handleSubmit()}>
      <Input
        label="Nama Template"
        {...register("nama")}
        error={errors.nama?.message}
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

export default FormTambah;
