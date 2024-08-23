"use client";

import { useEffect, useState } from "react";
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
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { Col, Row } from "@/components/grid/Grid";
import TablePenduduk from "./table-penduduk";

export default function PendudukPage() {
  const [sm, updateSm] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(true);

  useEffect(() => {
    console.log(showOffcanvas);
  }, [showOffcanvas]);

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
                  <li className="nk-block-tools-opt">
                    <Button
                      color="primary"
                      onClick={() => setShowOffcanvas(!showOffcanvas)}
                    >
                      <Icon name="plus" />
                      <span>Tambah Data</span>
                    </Button>
                    <Offcanvas
                      direction="end"
                      isOpen={showOffcanvas}
                      toggle={() => setShowOffcanvas(!showOffcanvas)}
                    >
                      <OffcanvasHeader
                        toggle={() => setShowOffcanvas(!showOffcanvas)}
                      >
                        Tambah Data Penduduk
                      </OffcanvasHeader>
                      <OffcanvasBody>hello</OffcanvasBody>
                    </Offcanvas>
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
            <TablePenduduk />
          </Col>
        </Row>
      </Block>
    </Content>
  );
}
