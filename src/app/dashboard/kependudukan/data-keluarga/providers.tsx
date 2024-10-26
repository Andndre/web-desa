"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getDataKeluarga,
  getTotalKeluarga,
} from "@/lib/server/data/kartuKeluargaData";
import { ReturnTypeItemAsync } from "@/lib/server/data/types";
import React from "react";

type DatatableType = ReturnTypeItemAsync<typeof getDataKeluarga>;

interface ITableKeluargaContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<DatatableType>;
}

export const TableKeluargaContext =
  React.createContext<ITableKeluargaContext | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<DatatableType>({
    getData: getDataKeluarga,
    getTotal: getTotalKeluarga,
  });

  return (
    <TableKeluargaContext.Provider
      value={{ showOffcanvas, setShowOffcanvas, dataTable }}
    >
      {children}
    </TableKeluargaContext.Provider>
  );
}
