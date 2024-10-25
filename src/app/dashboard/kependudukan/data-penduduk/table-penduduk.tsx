"use client";

import { Col, Row } from "@/components/grid/Grid";
import Icon from "@/components/icon/Icon";
import ReactDataTableServerSide, {
  Export,
  Refresh,
  ToggleDetailButton,
} from "@/components/table/ReactDataTable";
import { renderData, renderKey } from "@/lib/utils";
import React, { useContext } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { TablePendudukContext } from "./providers";

function TablePenduduk() {
  const {
    dataTable: {
      data,
      fetchData,
      handlePageChange,
      handlePerRowsChange,
      loading,
      totalRows,
      showDetail,
      toggleShowDetail,
      selectedItem,
      setSelectedItem,
    },
  } = useContext(TablePendudukContext)!;

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

  return (
    <Row className="g-gs">
      <Col lg={showDetail ? 8 : 12}>
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
          actionsBefore={[
            <Export key="export" data={data} />,
            <Refresh key="refresh" refreshData={fetchData} />,
          ]}
          actionsAfter={[
            <ToggleDetailButton
              key="toggle-detail"
              show={showDetail}
              toggleDetail={toggleShowDetail}
            />,
          ]}
          conditionalRowStyles={[
            {
              when: (row) => showDetail && row.nik == selectedItem,
              style: {
                backgroundColor: "#0fac8124",
              },
            },
          ]}
        />
      </Col>
      {showDetail && (
        <Col lg={4} className="d-none d-lg-block">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              Detail Penduduk
              <button
                className="bg-transparent p-0 btn shadow-none"
                onClick={toggleShowDetail}
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
