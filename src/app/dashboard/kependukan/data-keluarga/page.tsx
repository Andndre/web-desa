"use client";

import { getDataKeluarga } from "@/app/data";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

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
    </div>
  );
}
