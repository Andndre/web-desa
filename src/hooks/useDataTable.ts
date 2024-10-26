"use client";

import { useState } from "react";

export type UseDataTable<T> = ReturnType<typeof useDataTable<T>>;

export function useDataTable<DataType>({
  getData,
  getTotal,
}: {
  getData: (page: number, perPage: number, ...args: any) => Promise<DataType[]>;
  getTotal: (...args: any) => Promise<number>;
}) {
  const [data, setData] = useState<DataType[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [page, setPage] = useState(1);

  const [showDetail, setShowDetail] = useState(false);
  function toggleShowDetail() {
    setShowDetail(!showDetail);
  }

  async function fetchData() {
    setLoading(true);

    const [result, total] = await Promise.all([
      getData(page, perPage),
      getTotal(),
    ]);

    setTotalRows(total);
    setData(result);
    setLoading(false);
  }

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData();
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    const result = await getData(page, perPage);
    setPerPage(newPerPage);
    setData(result);
    setLoading(false);
  };

  return {
    data,
    totalRows,
    perPage,
    loading,
    selectedItem,
    page,
    showDetail,
    toggleShowDetail,
    handlePageChange,
    handlePerRowsChange,
    setSelectedItem,
    fetchData,
    setData,
  };
}
