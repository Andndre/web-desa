import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
} from "@/components/block/Block";
import { Col, Row } from "@/components/grid/Grid";
import Content from "@/layout/admin/content/Content";
import { kartuKeluargaData, pendudukData } from "@/server/data";
import React from "react";
import TableAnggotaKeluarga from "./table-anggota-keluarga";
import FormTambahToggle from "./form-tambah-toogle";
import {
  HeadActionResponsive,
  HeadActionItem,
} from "@/components/block/HeadActionResponsive";

interface DetailKeluargaProps {
  params: { no_kk: string };
}

async function DetailKeluarga({ params: { no_kk } }: DetailKeluargaProps) {
  const dataKeluarga = await kartuKeluargaData.getDetailKartuKeluarga(no_kk);
  const masters = await pendudukData.getMasters();

  if (!dataKeluarga) {
    return <Content>404</Content>;
  }

  return (
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Detail Data Keluarga
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Berikut merupakan data keluarga yang terdaftar</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent>
            <HeadActionResponsive>
              <HeadActionItem>
                <FormTambahToggle nomor_kk={no_kk} masters={masters} />
              </HeadActionItem>
            </HeadActionResponsive>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <Block>
        <Row className="g-gs">
          <Col xxl={8}>
            <TableAnggotaKeluarga data={dataKeluarga} />
          </Col>
        </Row>
      </Block>
    </Content>
  );
}

export default DetailKeluarga;
