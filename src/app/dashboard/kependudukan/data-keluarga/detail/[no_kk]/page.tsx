import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
} from "@/components/block/Block";
import {
  HeadActionResponsive,
  HeadActionItem,
} from "@/components/block/HeadActionResponsive";
import { Col, Row } from "@/components/grid/Grid";
import Content from "@/layout/admin/content/Content";
import { kartuKeluargaData } from "@/server/data";
import React from "react";
import TableAnggotaKeluarga from "./table-anggota-keluarga";

interface DetailKeluargaProps {
  params: { no_kk: string };
}

async function DetailKeluarga({ params: { no_kk } }: DetailKeluargaProps) {
  const dataKeluarga = await kartuKeluargaData.getDetailKartuKeluarga(no_kk);

  if (!dataKeluarga) {
    return <div>404</div>;
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
                {/* <FormTambahToggle masters={masters} /> */}
                back button
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
