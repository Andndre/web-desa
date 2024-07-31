"use client";

import { pendudukData } from "@/app/data";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import DataTable from "react-data-table-component";

type PendudukData = Awaited<ReturnType<typeof pendudukData.getDataPenduduk>>;
type PendudukDataRow = PendudukData[number];

export default function PendudukPage() {
  const [data, setData] = useState<PendudukData>([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  async function fetchPenduduk(page: number) {
    setLoading(true);
    const result = await pendudukData.getDataPenduduk(page, perPage);
    const total = await pendudukData.getTotalPenduduk();
    setTotalRows(total);
    setData(result);
    setLoading(false);
  }

  const handlePageChange = (page: number) => {
    fetchPenduduk(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    const result = await pendudukData.getDataPenduduk(page, perPage);
    setPerPage(newPerPage);
    setData(result);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Data Penduduk" description="Data Penduduk Desa" />
      <a
        href="/dashboard/kependukan/data-penduduk/tambah"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tambah data
      </a>
      <div className="pt-3"></div>
      <DataTable
        title="Data Penduduk"
        columns={[
          {
            name: "Nama",
            selector: (row: PendudukDataRow) => row.nama,
            sortable: true,
          },
          {
            name: "Jenis Kelamin",
            selector: (row: PendudukDataRow) => row.jenis_kelamin,
            sortable: true,
          },
        ]}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
}
   