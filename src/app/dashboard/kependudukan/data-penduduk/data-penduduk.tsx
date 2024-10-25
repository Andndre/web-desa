import React from "react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "@/components/block/Block";
import {
  HeadActionItem,
  HeadActionResponsive,
} from "@/components/block/HeadActionResponsive";
import { Col, Row } from "@/components/grid/Grid";
import Content from "@/layout/admin/content/Content";
import FormTambahToggle from "./form-tambah-toggle";
import TablePenduduk from "./table-penduduk";
import { getMasters } from "@/server/data/pendudukData";

interface IDataPendudukPage {
  masters: Awaited<ReturnType<typeof getMasters>>;
}

function DataPendudukPage({ masters }: IDataPendudukPage) {
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
            <HeadActionResponsive>
              <HeadActionItem>
                <FormTambahToggle masters={masters} />
              </HeadActionItem>
            </HeadActionResponsive>
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

export default DataPendudukPage;
