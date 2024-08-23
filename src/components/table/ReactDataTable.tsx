"use client";

import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { Col, Modal, ModalBody, Row, Button } from "reactstrap";
import DataTablePagination from "@/components/pagination/DataTablePagination";
import { TableProps } from "react-data-table-component/dist/DataTable/types";
import { TableData, renderData } from "@/lib/utils";

interface ExportProps<T> {
  data: T[];
}

const Export = <T extends object>({ data }: ExportProps<T>) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const formattedData = data.map((item) => {
    return Object.entries(item).reduce((acc, [key, value]) => {
      acc[key] = renderData(value);
      return acc;
    }, {} as any);
  });

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data: formattedData, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data: formattedData, fileName, exportType });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(formattedData));
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button
              className="buttons-copy buttons-html5"
              onClick={() => copyToClipboard()}
            >
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "}
          <button
            className="btn btn-secondary buttons-csv buttons-html5"
            type="button"
            onClick={() => exportCSV()}
          >
            <span>CSV</span>
          </button>{" "}
          <button
            className="btn btn-secondary buttons-excel buttons-html5"
            type="button"
            onClick={() => exportExcel()}
          >
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal
        isOpen={modal}
        className="modal-dialog-centered text-center"
        size="sm"
      >
        <ModalBody className="text-center m-2">
          <h5>Tersalin ke Clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">{data.length} data disalin!</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

// Use generic type T for the data
interface ExpandableRowProps<T extends object> {
  data: T;
}

const ReactDataTableServerSide = <T extends object>({
  data,
  columns,
  progressPending,
  actions,
  className,
  selectableRows,
  expandableRows,
  paginationTotalRows,
  onChangeRowsPerPage,
  onSelectedRowsChange,
  paginationServer,
  pagination,
  onChangePage,
  expandableRowsComponent,
  onRowClicked,
  conditionalRowStyles,
}: TableProps<T>) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPageS, setRowsPerPage] = useState(10);
  const [mobileView, setMobileView] = useState<boolean>(false);

  useEffect(() => {
    let defaultData = tableData;
    if (searchText !== "") {
      defaultData = data.filter((item) => {
        return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setTableData(defaultData);
    } else {
      setTableData(data);
    }
  }, [searchText, data]);

  const viewChange = () => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, [expandableRows]);

  return (
    <div
      className={`dataTables_wrapper dt-bootstrap4 no-footer ${
        className ? className : ""
      }`}
    >
      <Row className={`justify-between g-2 ${actions ? "with-export" : ""}`}>
        <Col className="col-7 text-start" sm="4">
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search"
                onChange={(ev) => setSearchText(ev.target.value)}
              />
            </label>
          </div>
        </Col>
        <Col className="col-5 text-end" sm="8">
          <div className="datatable-filter">
            <div className="d-flex justify-content-end g-2">
              {actions && <Export data={data} />}
              <div className="dataTables_length" id="DataTables_Table_0_length">
                <label>
                  <span className="d-none d-sm-inline-block">Show</span>
                  <div className="form-control-select">
                    {" "}
                    <select
                      name="DataTables_Table_0_length"
                      className="custom-select custom-select-sm form-control form-control-sm"
                      onChange={(e) =>
                        setRowsPerPage(parseInt(e.target.value, 10))
                      }
                      value={rowsPerPageS}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>{" "}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <DataTable
        data={tableData}
        columns={columns}
        className={className}
        progressPending={progressPending}
        selectableRows={selectableRows}
        paginationTotalRows={paginationTotalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onSelectedRowsChange={onSelectedRowsChange}
        selectableRowsSingle
        onRowClicked={onRowClicked}
        expandableRows={mobileView}
        expandableRowsComponent={expandableRowsComponent}
        noDataComponent={<div className="p-2">Tidak ada data</div>}
        sortIcon={
          <div>
            <span>&darr;</span>
            <span>&uarr;</span>
          </div>
        }
        paginationServer={paginationServer}
        pagination={pagination}
        conditionalRowStyles={conditionalRowStyles}
        paginationComponent={({
          currentPage,
          rowsPerPage,
          rowCount,
          onChangePage,
          onChangeRowsPerPage,
        }) => (
          <DataTablePagination
            customItemPerPage={rowsPerPageS}
            itemPerPage={rowsPerPage}
            totalItems={rowCount}
            paginate={onChangePage}
            currentPage={currentPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      ></DataTable>
    </div>
  );
};

export default ReactDataTableServerSide;
