import { getMasters } from "@/lib/server/data/pendudukData";
import Providers from "./providers";
import Content from "@/lib/components/layout/admin/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "@/lib/components/block/Block";
import {
  HeadActionItem,
  HeadActionResponsive,
} from "@/lib/components/block/HeadActionResponsive";
import FormTambahToggle from "./form-tambah-toggle";
import { Col, Row } from "reactstrap";
import TablePenduduk from "./table-penduduk";

export default async function Page() {
  const masters = await getMasters();
  return (
    <Providers>
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
    </Providers>
  );
}
