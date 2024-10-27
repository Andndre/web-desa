"use client";

import {
  deleteSuratTemplateField,
  getSuratTemplateFields,
} from "@/lib/server/data/surat";
import { ReturnTypeAsync } from "@/lib/server/data/types";
import React, { ReactNode, useContext, useState } from "react";

interface IContext {
  fields: ReturnTypeAsync<typeof getSuratTemplateFields>;
  setFields: React.Dispatch<
    React.SetStateAction<ReturnTypeAsync<typeof getSuratTemplateFields>>
  >;
  deleteField: (id: number) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type Params = {
  children: ReactNode;
  initialFields: ReturnTypeAsync<typeof getSuratTemplateFields>;
  id: number;
};

export const Context = React.createContext<IContext | null>(null);

export function Providers({ children, initialFields }: Params) {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = React.useState(initialFields);

  async function deleteField(id: number) {
    setLoading(true);
    setFields([...fields.filter((field) => field.id !== id)]);
    await deleteSuratTemplateField(id);
    setLoading(false);
  }

  return (
    <Context.Provider
      value={{ fields, setFields, deleteField, loading, setLoading }}
    >
      {children}
    </Context.Provider>
  );
}
