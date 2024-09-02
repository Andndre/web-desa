"use client";

import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "@/components/block/Block";
import {
  HeadActionResponsive,
  HeadActionItem,
} from "@/components/block/HeadActionResponsive";
import { Col, Row } from "@/components/grid/Grid";
import Content from "@/layout/admin/content/Content";
import TableKeluarga from "./table-keluarga";
import FormTambahToggle from "./form-tambah-toggle";

export default function KeluargaPage() {
  return (
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Data Keluarga
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Berikut merupakan data keluarga yang terdaftar</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent>
            <HeadActionResponsive>
              <HeadActionItem>
                <FormTambahToggle />
              </HeadActionItem>
            </HeadActionResponsive>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <Block>
        <Row className="g-gs">
          <Col xxl={8}>
            <TableKeluarga />
          </Col>
        </Row>
      </Block>
    </Content>
  );
}
