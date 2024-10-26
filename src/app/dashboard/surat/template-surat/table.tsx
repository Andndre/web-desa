"use client";

import ReactDataTableServerSide, {
  Export,
  Refresh,
} from "@/lib/components/table/ReactDataTable";
import { renderKey, renderData } from "@/lib/utils/Utils";
import { useContext } from "react";
import { Context } from "./providers";

function TableSuratTemplate() {
  const {
    dataTable: {
      data,
      fetchData,
      handlePageChange,
      handlePerRowsChange,
      loading,
      totalRows,
    },
  } = useContext(Context)!;

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
          name: "Nama",
          selector: (row) => row.nama,
          sortable: true,
        },
        {
          name: "Dibuat pada",
          selector: (row) => row.created_at.toString(),
          sortable: true,
        },
        // {
        //   name: "Aksi",
        //   cell: (row) => {
        //     return (
        //       <Link
        //         href={`/dashboard/kependudukan/data-keluarga/detail/${row.nomor_kk}`}
        //         color="warning"
        //       >
        //         <div className="btn btn-sm btn-warning">
        //           <Icon name="edit-fill" />
        //         </div>
        //       </Link>
        //     );
        //   },
        // },
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

export default TableSuratTemplate;
