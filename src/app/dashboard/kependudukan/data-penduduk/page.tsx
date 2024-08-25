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
import { pendudukData } from "@/server/data";
import FormTambahToggle from "./form-tambah-toggle";
import TablePenduduk from "./table-penduduk";

export default async function PendudukPage() {
  const masters = await pendudukData.getMasters();

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
