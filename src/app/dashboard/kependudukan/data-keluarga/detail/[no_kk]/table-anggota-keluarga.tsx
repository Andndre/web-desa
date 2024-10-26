"use client";

import Icon from "@/lib/components/icon/Icon";
import { applyUrutan } from "@/lib/server/data/kartuKeluargaData";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import { TablePendudukContext } from "./providers";
import ReactDataTableServerSide, {
  Export,
  Refresh,
} from "@/lib/components/table/ReactDataTable";
import { renderData, renderKey } from "@/lib/utils/Utils";

function TableAnggotaKeluarga() {
  const {
    dataTable: {
      data,
      fetchData,
      handlePageChange,
      handlePerRowsChange,
      loading,
      totalRows,
      setData,
    },
  } = useContext(TablePendudukContext)!;

  // const [dataTable, setData] = useState<DetailKartuKeluargaResponse>(data);
  const [saveButton, setSaveButton] = useState(false);

  async function simpan() {
    await applyUrutan(data);
    setSaveButton(false);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setSaveButton(true);
    const updatedData = [...data];
    updatedData[index].urutan -= 1;
    updatedData[index - 1].urutan += 1;
    [updatedData[index], updatedData[index - 1]] = [
      updatedData[index - 1],
      updatedData[index],
    ];
    setData(updatedData);
  }

  function moveDown(index: number) {
    if (index === data.length - 1) return;
    setSaveButton(true);
    const updatedData = [...data];
    updatedData[index].urutan += 1;
    updatedData[index + 1].urutan -= 1;
    [updatedData[index], updatedData[index + 1]] = [
      updatedData[index + 1],
      updatedData[index],
    ];
    setData(updatedData);
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

  return (
    <Row className="g-gs">
      <Col>
        `{" "}
        {saveButton && (
          <Button onClick={() => simpan()} color="primary" className="mb-1">
            <Icon name="save" className="me-2" /> Simpan
          </Button>
        )}
        <ReactDataTableServerSide
          columns={[
            {
              name: "NIK",
              selector: (row) => row.nik,
              sortable: true,
            },
            {
              name: "NO KK",
              selector: (row) => row.kk_id,
              sortable: true,
            },
            {
              name: "Nama",
              selector: (row) => row.nama,
              sortable: true,
            },
            {
              name: "Jenis Kelamin",
              selector: (row) => row.jenis_kelamin,
            },
            {
              name: "Hubungan",
              selector: (row) => row.hubungan?.nama || "Tidak Ada",
            },
            {
              name: "Status",
              selector: (row) => row.status?.nama || "Tidak Ada",
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
          actionsBefore={[
            <Export key="export" data={data} />,
            <Refresh key="refresh" refreshData={fetchData} />,
          ]}
        />
      </Col>
    </Row>
  );
}

export default TableAnggotaKeluarga;
