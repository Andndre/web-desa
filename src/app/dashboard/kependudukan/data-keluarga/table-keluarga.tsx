"use client";

import Icon from "@/lib/components/icon/Icon";
import ReactDataTableServerSide, {
  Export,
  Refresh,
} from "@/lib/components/table/ReactDataTable";
import { renderKey, renderData } from "@/lib/utils";
import {
  getDataKeluarga,
  getTotalKeluarga,
} from "@/server/data/kartuKeluargaData";
import Link from "next/link";
import { useDataTable } from "@/hooks/useDataTable";

function TableKeluarga() {
  const {
    data,
    loading,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    fetchData,
  } = useDataTable({
    getData: getDataKeluarga,
    getTotal: getTotalKeluarga,
  });

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
              <Link
                href={`/dashboard/kependudukan/data-keluarga/detail/${row.nomor_kk}`}
                color="warning"
              >
                <div className="btn btn-sm btn-warning">
                  <Icon name="edit-fill" />
                </div>
              </Link>
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
      actions={
        <>
          <Export data={data} /> <Refresh refreshData={fetchData} />{" "}
        </>
      }
    />
  );
}

export default TableKeluarga;
