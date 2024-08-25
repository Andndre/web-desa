"use client";

import { PendudukData } from "@/server/data";
import { useState } from "react";

function TableKeluarga() {
  const [data, setData] = useState<PendudukData>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  return <div>TableKeluarga</div>;
}

export default TableKeluarga;
