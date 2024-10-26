"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getDetailKartuKeluarga,
  getDetailKartuKeluargaTotal,
} from "@/lib/server/data/kartuKeluargaData";
import { ReturnTypeItemAsync } from "@/lib/server/data/types";
import React from "react";

export type DatatableType = ReturnTypeItemAsync<typeof getDetailKartuKeluarga>;

interface ITablePendudukContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<DatatableType>;
}

export const TablePendudukContext =
  React.createContext<ITablePendudukContext | null>(null);

interface ProvidersParams {
  children: React.ReactNode;
  getDetailKartuKeluarga: (
    page: number,
    perPage: number
  ) => Promise<DatatableType[]>;
}

export default function Providers({
  children,
  getDetailKartuKeluarga,
}: ProvidersParams) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<DatatableType>({
    getData: getDetailKartuKeluarga,
    getTotal: getDetailKartuKeluargaTotal,
  });

  return (
    <TablePendudukContext.Provider
      value={{ showOffcanvas, setShowOffcanvas, dataTable }}
    >
      {children}
    </TablePendudukContext.Provider>
  );
}
