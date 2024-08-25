"use client";

import Icon from "@/components/icon/Icon";
import ReactDataTableServerSide from "@/components/table/ReactDataTable";
import { renderKey, renderData } from "@/lib/utils";
import { KeluargaData, kartuKeluargaData } from "@/server/data";
import { useState } from "react";
import { Button } from "reactstrap";

function TableKeluarga() {
  const [data, setData] = useState<KeluargaData>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  async function fetchKeluarga(page: number) {
    setLoading(true);

    const [result, total] = await Promise.all([
      kartuKeluargaData.getDataKeluarga(page, perPage),
      kartuKeluargaData.getTotalKeluarga(),
    ]);

    setTotalRows(total);
    setData(result);
    setLoading(false);
  }

  const renderItem = <T extends object>(item: T) => {
    return (
      <>
        {Object.entries(item).map(([key, value]) => (
          <li key={key}>
            <span className="dtr-title fw-bold">{renderKey(key)}</span>
            {": "}
            <span className="dtr-data">{renderData(value)}</span>
          </li>
        ))}
      </>
    );
  };

  const handlePageChange = (page: number) => {
    fetchKeluarga(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    const result = await kartuKeluargaData.getDataKeluarga(page, perPage);
    setPerPage(newPerPage);
    setData(result);
    setLoading(false);
  };

  return (
    <ReactDataTableServerSide
      columns={[
        {
          name: "Nomor Kartu Keluarga",
          selector: (row) => row.nomor_kk,
          sortable: true,
        },
        {
          name: "Kepala Keluarga",
          selector: (row) => row.kepala_keluarga?.nama || "Belum Ada",
          sortable: true,
          
        },
        {
          name: "Aksi",
          cell: (row) => {
            return (
              <Button
                href={`/dashboard/kependudukan/data-keluarga/detail/${row.nomor_kk}`}
                color="warning"
                size="sm"
              >
                <Icon name="edit-fill" />
              </Button>
            );
          },
        },
      ]}
      data={data}
      pagination
      paginationServer
      expandableRows
      expandableRowsComponent={(props) => (
        <ul className="dtr-details p-2 border-bottom ms-1">
          {renderItem(props.data)}
        </ul>
      )}
      progressPending={loading}
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      actions
    />
  );
}

export default TableKeluarga;
