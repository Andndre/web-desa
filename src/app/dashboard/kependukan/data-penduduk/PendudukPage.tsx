"use client";
import { getDataPenduduk } from "@/app/data";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Penduduk } from "./page";

export default function PendudukPage({
  searchParams,
}: {
  searchParams: { page?: string; take?: string };
}) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(
    searchParams.page ? parseInt(searchParams.page) : 1
  );
  const [take, setTake] = useState(
    searchParams.take ? parseInt(searchParams.take) : 10
  );
  const [penduduk, setPenduduk] = useState<Penduduk[]>([]);

  async function fetchPenduduk() {
    setLoading(true);
    const result = await getDataPenduduk(
      searchParams.page ? parseInt(searchParams.page) : undefined,
      searchParams.take ? parseInt(searchParams.take) : undefined
    );
    setPenduduk(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchPenduduk();
  }, [page, take]);

  const columns = [
    {
      name: "No",
      selector: (_: Penduduk, index: number) => index + 1 + (page - 1) * take,
    },
    {
      name: "Nama",
      selector: (row: Penduduk) => row.nama,
    },
    {
      name: "Jenis Kelamin",
      selector: (row: Penduduk) => row.jenis_kelamin,
    },
    {
      name: "Tanggal Lahir",
      selector: (row: Penduduk) =>
        row.tanggal_lahir
          ? new Date(row.tanggal_lahir).toDateString()
          : "Tidak diketahui",
    },
    {
      name: "Aksi",
      cell: (row: Penduduk) => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Action
        </button>
      ),
    },
  ];

  const optionsTake = [10, 25, 50, 100];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Data Penduduk" description="Data Penduduk Desa" />
      {/* dropdown for page */}
      <div className="flex justify-end gap-3">
        <select
          name="take"
          id="take"
          className="border border-stroke text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-graydark dark:placeholder-gray dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={take}
          onChange={(e) => setTake(parseInt(e.target.value))}
        >
          {optionsTake.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        <a
          href="/dashboard/kependukan/data-penduduk/tambah"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah data
        </a>
      </div>
      <div className="pt-3"></div>
      {/* table */}
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable
          columns={columns}
          data={penduduk}
          progressPending={loading}
          noDataComponent="No data available"
          pagination
          paginationServer
          paginationTotalRows={penduduk.length}
          paginationDefaultPage={page}
          onChangePage={setPage}
          onChangeRowsPerPage={setTake}
          paginationRowsPerPageOptions={optionsTake}
        />
        <p className="text-sm py-3 text-center">
          Menampilkan {take} data pada halaman {page}
        </p>
      </div>
      {/* end table */}
      {/* pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-700 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Sebelumnya
        </button>
        <button
          onClick={handleNextPage}
          disabled={take !== penduduk.length}
          className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-700 ${
            take !== penduduk.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
