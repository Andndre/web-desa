"use client";

import { Col, Row } from "@/components/grid/Grid";
import Icon from "@/components/icon/Icon";
import ReactDataTableServerSide, {
  Export,
  Refresh,
  ToggleDetailButton,
} from "@/components/table/ReactDataTable";
import { renderData, renderKey } from "@/lib/utils";
import { getDataPenduduk, getTotalPenduduk } from "@/server/data/pendudukData";
import { type PendudukData } from "@/server/data/types";
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

function TablePenduduk() {
  const [data, setData] = useState<PendudukData>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [page, setPage] = useState(1);

  const [showDetailPenduduk, setShowDetailPenduduk] = useState(false);
  function toggleShowDetailPenduduk() {
    setShowDetailPenduduk(!showDetailPenduduk);
  }

  async function fetchPenduduk() {
    setLoading(true);

    const [result, total] = await Promise.all([
      getDataPenduduk(page, perPage),
      getTotalPenduduk(),
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

  const renderSelectedItem = () => {
    const item = data.find((item) => item.nik === selectedItem);
    if (!item) return <p>Pilih satu data untuk melihat detailnya.</p>;
    return <ul>{renderItem(item)}</ul>;
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchPenduduk();
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    const result = await getDataPenduduk(page, perPage);
    setPerPage(newPerPage);
    setData(result);
    setLoading(false);
  };

  return (
    <Row className="g-gs">
      <Col lg={showDetailPenduduk ? 8 : 12}>
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
          onRowClicked={(row) => {
            setSelectedItem(row.nik);
          }}
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
              <Export data={data} /> <Refresh refreshData={fetchPenduduk} />{" "}
            </>
          }
          actionsAfter={
            <>
              <ToggleDetailButton
                show={showDetailPenduduk}
                toggleDetail={toggleShowDetailPenduduk}
              />
            </>
          }
          conditionalRowStyles={[
            {
              when: (row) => showDetailPenduduk && row.nik == selectedItem,
              style: {
                backgroundColor: "#0fac8124",
              },
            },
          ]}
        />
      </Col>
      {showDetailPenduduk && (
        <Col lg={4} className="d-none d-lg-block">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              Detail Penduduk
              <button
                className="bg-transparent p-0 btn shadow-none"
                onClick={toggleShowDetailPenduduk}
              >
                <Icon name="cross" />
              </button>
            </CardHeader>
            <CardBody>{renderSelectedItem()}</CardBody>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default TablePenduduk;
