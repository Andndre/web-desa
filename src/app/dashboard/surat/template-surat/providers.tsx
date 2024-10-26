"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getSuratTemplate,
  getTotalSuratTemplate,
} from "@/lib/server/data/surat";
import { ReturnTypeItemAsync } from "@/lib/server/data/types";
import React from "react";

type DatatableType = ReturnTypeItemAsync<typeof getSuratTemplate>;

interface IContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<DatatableType>;
}

export const Context = React.createContext<IContext | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<DatatableType>({
    getData: getSuratTemplate,
    getTotal: getTotalSuratTemplate,
  });

  return (
    <Context.Provider value={{ showOffcanvas, setShowOffcanvas, dataTable }}>
      {children}
    </Context.Provider>
  );
}
