import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
} from "@/lib/components/block/Block";
import { Col, Row } from "@/lib/components/grid/Grid";
import Content from "@/lib/components/layout/admin/content/Content";
import React from "react";
import TableAnggotaKeluarga from "./table-anggota-keluarga";
import FormTambahToggle from "./form-tambah-toogle";
import {
  HeadActionResponsive,
  HeadActionItem,
} from "@/lib/components/block/HeadActionResponsive";
import { getDetailKartuKeluarga } from "@/lib/server/data/kartuKeluargaData";
import { getMasters } from "@/lib/server/data/pendudukData";
import Providers from "./providers";

interface DetailKeluargaProps {
  params: { no_kk: string };
}

async function DetailKeluarga({ params: { no_kk } }: DetailKeluargaProps) {
  async function fetchData(page: number, perPage: number) {
    "use server";
    return await getDetailKartuKeluarga(page, perPage, no_kk);
  }

  const masters = await getMasters();

  return (
    <Providers getDetailKartuKeluarga={fetchData}>
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
              <TableAnggotaKeluarga />
            </Col>
          </Row>
        </Block>
      </Content>
    </Providers>
  );
}

export default DetailKeluarga;
