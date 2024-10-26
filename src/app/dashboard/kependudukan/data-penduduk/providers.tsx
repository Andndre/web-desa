"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  ReturnTypeOfGetDataPenduduk,
  getDataPenduduk,
  getTotalPenduduk,
} from "@/server/data/pendudukData";
import React from "react";

interface ITablePendudukContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<ReturnTypeOfGetDataPenduduk>;
}

export const TablePendudukContext =
  React.createContext<ITablePendudukContext | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<ReturnTypeOfGetDataPenduduk>({
    getData: getDataPenduduk,
    getTotal: getTotalPenduduk,
  });

  return (
    <TablePendudukContext.Provider
      value={{ showOffcanvas, setShowOffcanvas, dataTable }}
    >
      {children}
    </TablePendudukContext.Provider>
  );
}
