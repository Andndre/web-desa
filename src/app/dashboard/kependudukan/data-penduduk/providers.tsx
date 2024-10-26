"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getDataPenduduk,
  getTotalPenduduk,
} from "@/lib/server/data/pendudukData";
import { ReturnTypeItemAsync } from "@/lib/server/data/types";
import React from "react";

type DatatableType = ReturnTypeItemAsync<typeof getDataPenduduk>;

interface ITablePendudukContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<DatatableType>;
}

export const TablePendudukContext =
  React.createContext<ITablePendudukContext | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<DatatableType>({
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
