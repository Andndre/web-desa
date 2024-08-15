"use client";

import { useState } from "react";
import { pendudukActions } from "@/server/actions";
import { searchKartuKeluarga } from "@/server/data/kartuKeluargaData";
import { MastersType } from "@/server/data/pendudukData";
import { PendudukFormSchema } from "@/server/actions/formschemas";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { SelectSearch } from "@/components/Form/SelectSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import RightDrawer from "@/components/Drawer/RightDrawer";

interface IForm {
  masters: MastersType;
}

export default function Form({ masters }: IForm) {
  const [showDrawer, setShowDrawer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<PendudukFormSchema.DataPendudukFormSchemaInputType>({
    resolver: zodResolver(
      PendudukFormSchema.tambahDataPendudukSchema,
      {},
      { raw: true }
    ),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<
    PendudukFormSchema.DataPendudukFormSchemaInputType
  > = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(
        key,
        data[key as keyof PendudukFormSchema.DataPendudukFormSchemaInputType]
      );
    }

    const success = await pendudukActions.tambahDataPenduduk(formData);
    reset();
    if (success) alert("Data berhasil ditambahkan");
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <RightDrawer
        show={showDrawer}
        closeFn={() => {
          console.log("closing the drawer");
          setShowDrawer(false);
          console.log(showDrawer);
        }}
      >
        <div>
          <h3 className="font-medium text-black dark:text-white">
            Formulir Penambahan Penduduk Baru
          </h3>
        </div>
      </RightDrawer>
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Formulir Penambahan Penduduk Baru
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5.5 p-6.5"
      >
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
        <SelectSearch
          label="Nomor Kartu Keluarga"
          {...register("kk_id")}
          error={errors.kk_id?.message}
          required
          actiontitle="Tambah Data"
          setvalue={(value: string) => {
            setValue("kk_id", value, { shouldValidate: true });
          }}
          searchfunction={async (value) => {
            // fungsi searchKartuKeluarga berjalan di sisi server
            const data = await searchKartuKeluarga(value);
            const result = [];
            for (const item of data) {
              result.push({
                id: item.nomor_kk,
                nama: item.kepala_keluarga?.nama || "Tidak diketahui",
              });
            }
            return result;
          }}
          actionactive={true}
          actionfunction={() => {
            setShowDrawer(true);
          }}
        />
        <Select
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
        <Select
          label="Agama"
          {...register("agama_id")}
          error={errors.agama_id?.message}
          required
          options={masters.agama}
        />
        <Input
          label="Alamat"
          {...register("alamat")}
          error={errors.alamat?.message}
        />
        <Select
          label="Disabilitas"
          {...register("cacat_id")}
          error={errors.cacat_id?.message}
          required
          options={masters.disabilitas}
        />
        <Select
          label="Hubungan"
          {...register("hubungan_id")}
          error={errors.hubungan_id?.message}
          required
          options={masters.hubungan}
        />
        <Select
          label="Golongan Darah"
          {...register("golongan_darah_id")}
          error={errors.golongan_darah_id?.message}
          required
          options={masters.golonganDarah}
        />
        <Select
          label="Sakit Menahun"
          {...register("sakit_menahun_id")}
          error={errors.sakit_menahun_id?.message}
          required
          options={masters.sakitMenahun}
        />
        <Select
          label="Pekerjaan"
          {...register("pekerjaan_id")}
          error={errors.pekerjaan_id?.message}
          required
          options={masters.pekerjaan}
        />
        <Select
          label="Pendidikan"
          {...register("pendidikan_id")}
          error={errors.pendidikan_id?.message}
          required
          options={masters.pendidikan}
        />
        <Input
          label="Nomor Akta Kelahiran"
          {...register("nomor_akta_lahir")}
          error={errors.nomor_akta_lahir?.message}
          required
        />
        <Select
          label="Status Dasar"
          {...register("status_dasar_id")}
          error={errors.status_dasar_id?.message}
          required
          options={masters.statusDasar}
        />
        <Select
          label="Status"
          {...register("status_id")}
          error={errors.status_id?.message}
          required
          options={masters.status}
        />
        <Select
          label="Suku"
          {...register("suku_id")}
          error={errors.suku_id?.message}
          required
          options={masters.suku}
        />
        <Select
          label="Status Kawin"
          {...register("status_kawin_id")}
          error={errors.status_kawin_id?.message}
          required
          options={masters.statusKawin}
        />
        <Input
          label="Telepon"
          {...register("telepon")}
          error={errors.telepon?.message}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {isSubmitting ? "Loading..." : "Tambah Data"}
        </button>
      </form>
    </div>
  );
}
