"use client";

import { Col, Row } from "@/components/grid/Grid";
import ReactDataTableServerSide from "@/components/table/ReactDataTable";
import { renderData, renderKey } from "@/lib/utils";
import { type PendudukData, pendudukData } from "@/server/data";
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

function TablePenduduk() {
  const [data, setData] = useState<PendudukData>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  async function fetchPenduduk(page: number) {
    setLoading(true);

    const [result, total] = await Promise.all([
      pendudukData.getDataPenduduk(page, perPage),
      pendudukData.getTotalPenduduk(),
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
    fetchPenduduk(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);
    const result = await pendudukData.getDataPenduduk(page, perPage);
    setPerPage(newPerPage);
    setData(result);
    setLoading(false);
  };

  return (
    <Row className="g-gs">
      <Col lg={8}>
        <ReactDataTableServerSide
          columns={[
            {
              name: "NIK",
              selector: (row) => row.nik,
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
          actions
          conditionalRowStyles={[
            {
              when: (row) => row.nik == selectedItem,
              style: {
                backgroundColor: "#0fac8124",
              },
            },
          ]}
        />
      </Col>
      <Col lg={4} className="d-none d-lg-block">
        <Card>
          <CardHeader>Detail Penduduk</CardHeader>
          <CardBody>{renderSelectedItem()}</CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default TablePenduduk;
