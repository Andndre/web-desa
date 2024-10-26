"use client";

import { type UseDataTable, useDataTable } from "@/hooks/useDataTable";
import {
  getSuratTemplate,
  getTotalSuratTemplate,
  ReturnTypeOfGetSuratTemplateItem,
} from "@/lib/server/data/surat";
import React from "react";

interface IContext {
  showOffcanvas: boolean;
  setShowOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  dataTable: UseDataTable<ReturnTypeOfGetSuratTemplateItem>;
}

export const Context = React.createContext<IContext | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const dataTable = useDataTable<ReturnTypeOfGetSuratTemplateItem>({
    getData: getSuratTemplate,
    getTotal: getTotalSuratTemplate,
  });

  return (
    <Context.Provider value={{ showOffcanvas, setShowOffcanvas, dataTable }}>
      {children}
    </Context.Provider>
  );
}
