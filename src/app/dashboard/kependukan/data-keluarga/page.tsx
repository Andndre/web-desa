"use client";

import { getDataKeluarga } from "@/app/data";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";

export default function KeluargaPage({
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
  const [keluarga, setKeluarga] = useState<
    Awaited<ReturnType<typeof getDataKeluarga>>
  >([]);

  async function fetchKeluarga() {
    setLoading(true);
    const result = await getDataKeluarga(
      searchParams.page ? parseInt(searchParams.page) : undefined,
      searchParams.take ? parseInt(searchParams.take) : undefined
    );
    setKeluarga(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchKeluarga();
  }, [page, take]);

  const optionsTake = [10, 25, 50, 100];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Data Keluarga" description="Data Keluarga Desa" />
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
          href="/dashboard/kependukan/data-keluarga/tambah"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah data
        </a>
      </div>
      <div className="pt-3"></div>
      {/* table */}
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">NIK</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="bg-white border-b border-gray-3 dark:bg-black">
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              keluarga.map((p, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-3 dark:bg-black"
                >
                  <td className="px-6 py-4">{index + 1 + (page - 1) * take}</td>
                  <td className="px-6 py-4">{p.nik_kepala_keluarga}</td>

                  <td className="px-6 py-4">Action</td>
                </tr>
              ))
            )}
            {/* no data */}
            {!loading && keluarga.length === 0 && (
              <tr className="bg-white border-b border-stroke dark:bg-black">
                <td colSpan={5} className="px-6 py-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          disabled={take != keluarga.length}
          className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-700 ${
            take != keluarga.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
