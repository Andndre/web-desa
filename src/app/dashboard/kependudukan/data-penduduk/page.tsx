"use client";

import { pendudukData } from "@/server/data";
import { useState } from "react";
import Link from "next/link";
import Content from "@/layout/admin/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "@/components/block/Block";
import Button from "@/components/button/Button";
import Icon from "@/components/icon/Icon";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Col, Row } from "@/components/grid/Grid";
import TablePenduduk from "./table-penduduk";

type PendudukData = Awaited<ReturnType<typeof pendudukData.getDataPenduduk>>;
type PendudukDataRow = PendudukData[number];

export default function PendudukPage() {
  const [data, setData] = useState<PendudukData>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sm, updateSm] = useState(false);

  async function fetchPenduduk(page: number) {
    setLoading(true);
    const result = await pendudukData.getDataPenduduk(page, perPage);
    const total = await pendudukData.getTotalPenduduk();
    setTotalRows(total);
    setData(result);
    setLoading(false);
  }

  return (
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Data Penduduk
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Berikut merupakan data penduduk yang terdaftar</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <Button
                className={`btn-icon btn-trigger toggle-expand me-n1 ${
                  sm ? "active" : ""
                }`}
                onClick={() => updateSm(!sm)}
              >
                <Icon name="more-v" />
              </Button>
              <div
                className="toggle-expand-content"
                style={{ display: sm ? "block" : "none" }}
              >
                <ul className="nk-block-tools g-3">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                      >
                        <Icon
                          className="d-none d-sm-inline"
                          name="calender-date"
                        />
                        <span>
                          <span className="d-none d-md-inline">Last</span> 30
                          Days
                        </span>
                        <Icon className="dd-indc" name="chevron-right" />
                      </DropdownToggle>
                      <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                              href="#!"
                            >
                              <span>Last 30 days</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                              href="#dropdownitem"
                            >
                              <span>Last 6 months</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                              href="#dropdownitem"
                            >
                              <span>Last 3 weeks</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                  <li className="nk-block-tools-opt">
                    <Button color="primary">
                      <Icon name="plus" />
                      <span>Tambah Data</span>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <Block>
        <Row className="g-gs">
          <Col xxl={8}>
            <TablePenduduk/>
          </Col>
        </Row>
      </Block>
    </Content>
  );
}

// import { pendudukData } from "@/server/data";
// import Link from "next/link";
// import { useState } from "react";
// import DataTable from "react-data-table-component";

// type PendudukData = Awaited<ReturnType<typeof pendudukData.getDataPenduduk>>;
// type PendudukDataRow = PendudukData[number];

// export default function PendudukPage() {
//   const [data, setData] = useState<PendudukData>([]);

//   const [totalRows, setTotalRows] = useState(0);
//   const [perPage, setPerPage] = useState(10);
//   const [loading, setLoading] = useState(false);

//   async function fetchPenduduk(page: number) {
//     setLoading(true);
//     const result = await pendudukData.getDataPenduduk(page, perPage);
//     const total = await pendudukData.getTotalPenduduk();
//     setTotalRows(total);
//     setData(result);
//     setLoading(false);
//   }

//   const handlePageChange = (page: number) => {
//     fetchPenduduk(page);
//   };

//   const handlePerRowsChange = async (newPerPage: number, page: number) => {
//     setLoading(true);
//     const result = await pendudukData.getDataPenduduk(page, perPage);
//     setPerPage(newPerPage);
//     setData(result);
//     setLoading(false);
//   };

//   return (
//     <div className="mx-auto max-w-242.5">
//       <Link
//         href="/dashboard/kependukan/data-penduduk/tambah"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Tambah data
//       </Link>
//       <div className="pt-3"></div>
//       <DataTable
//         title="Data Penduduk"
//         columns={[
//           {
//             name: "Nama",
//             selector: (row: PendudukDataRow) => row.nama,
//             sortable: true,
//           },
//           {
//             name: "Jenis Kelamin",
//             selector: (row: PendudukDataRow) => row.jenis_kelamin,
//             sortable: true,
//           },
//         ]}
//         data={data}
//         progressPending={loading}
//         pagination
//         paginationServer
//         paginationTotalRows={totalRows}
//         onChangeRowsPerPage={handlePerRowsChange}
//         onChangePage={handlePageChange}
//       />
//     </div>
//   );
// }
