"use client";

import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import { Col, Row, Button } from "reactstrap";
import DataTablePagination from "@/lib/components/pagination/DataTablePagination";
import { TableProps } from "react-data-table-component/dist/DataTable/types";
import { renderData } from "@/lib/utils/Utils";
import Icon from "../icon/Icon";
import Loader from "../common/Loader";

interface ToggleDetailProps {
  toggleDetail: () => void;
  show: boolean;
}

export const ToggleDetailButton = ({
  toggleDetail,
  show,
}: ToggleDetailProps) => (
  <div className="dt-buttons btn-group flex-wrap">
    <button
      className="btn btn-secondary buttons-html5 action-button"
      type="button"
      onClick={() => toggleDetail()}
    >
      <Icon name={show ? "eye-off" : "eye"} />
    </button>
  </div>
);

interface ExportProps<T> {
  data: T[];
}

export const Export = <T extends object>({ data }: ExportProps<T>) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const formattedData = data.map((item) =>
    Object.entries(item).reduce((acc, [key, value]) => {
      acc[key] = renderData(value);
      return acc;
    }, {} as any)
  );

  const exportExcel = () => {
    exportFromJSON({
      data: formattedData,
      fileName,
      exportType: exportFromJSON.types.xls,
    });
  };

  return (
    <div className="dt-buttons btn-group flex-wrap action-group">
      <button className="btn btn-secondary action-button" onClick={exportExcel}>
        <Icon name="download" />
      </button>
    </div>
  );
};

interface RefreshProps {
  refreshData: () => Promise<void>;
}

export const Refresh = ({ refreshData }: RefreshProps) => {
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  return (
    <div className="dt-buttons btn-group flex-wrap">
      <Button
        className="buttons-html5 action-button"
        onClick={refresh}
        disabled={loading}
      >
        <Icon name="reload" />
      </Button>
    </div>
  );
};

const ReactDataTableServerSide = <T extends object>({
  data,
  columns,
  progressPending,
  actionsBefore,
  actionsAfter,
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
  ...rest
}: TableProps<T> & {
  actionsAfter?: React.ReactNode[];
  actionsBefore?: React.ReactNode[];
}) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPageS, setRowsPerPage] = useState(10);
  const [mobileView, setMobileView] = useState<boolean>(false);

  useEffect(() => {
    const defaultData = searchText
      ? data.filter((item) =>
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      : data;
    setTableData(defaultData);
  }, [searchText, data]);

  const viewChange = useCallback(() => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [expandableRows]);

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, [viewChange]);

  return (
    <div
      className={`dataTables_wrapper dt-bootstrap4 no-footer ${
        className || ""
      }`}
    >
      <Row className="justify-between g-2 with-export">
        <Col className="col-7 text-start" sm="4">
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>
          </div>
        </Col>
        <Col className="col-5 text-end" sm="8">
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-end g-2">
              <div
                className={`d-flex align-center g-2 ${
                  mobileView ? "mobile-actions" : ""
                }`}
              >
                {actionsBefore}
              </div>
              <div className="dataTables_length">
                <label>
                  <span className="d-none d-sm-inline-block">Show</span>
                  <div className="form-control-select">
                    <select
                      name="DataTables_Table_0_length"
                      className="custom-select custom-select-sm"
                      onChange={(e) =>
                        setRowsPerPage(parseInt(e.target.value, 10))
                      }
                      value={rowsPerPageS}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </label>
              </div>
              <div
                className={`d-flex align-center g-2 ${
                  mobileView ? "mobile-actions" : ""
                }`}
              >
                {actionsAfter}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <DataTable
        data={tableData}
        columns={columns}
        className={className}
        progressComponent={<Loader customHeight="200px" />}
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
        noDataComponent={<div className="p-2">No Data Available</div>}
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
        {...rest}
      />
    </div>
  );
};

export default ReactDataTableServerSide;
