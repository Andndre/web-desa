"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getDetailKartuKeluargaTotal,
  ReturnTypeOfGetDetailKartuKeluarga,
  ReturnTypeOfGetDetailKartuKeluargaItem,
} from "@/lib/server/data/kartuKeluargaData";
import React from "react";

interface ITablePendudukContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<ReturnTypeOfGetDetailKartuKeluargaItem>;
}

export const TablePendudukContext =
  React.createContext<ITablePendudukContext | null>(null);

interface ProvidersParams {
  children: React.ReactNode;
  getDetailKartuKeluarga: (
    page: number,
    perPage: number
  ) => Promise<ReturnTypeOfGetDetailKartuKeluarga>;
}

export default function Providers({
  children,
  getDetailKartuKeluarga,
}: ProvidersParams) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<ReturnTypeOfGetDetailKartuKeluargaItem>({
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
