"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getDataKeluarga,
  getTotalKeluarga,
  ReturnTypeOfGetDataKeluarga,
} from "@/lib/server/data/kartuKeluargaData";
import React from "react";

interface ITableKeluargaContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<ReturnTypeOfGetDataKeluarga>;
}

export const TableKeluargaContext =
  React.createContext<ITableKeluargaContext | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<ReturnTypeOfGetDataKeluarga>({
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
