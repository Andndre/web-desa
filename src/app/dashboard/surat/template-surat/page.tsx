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
import { Col, Row } from "reactstrap";
import Providers from "./providers";
import TableSuratTemplate from "./table";
import Drawer from "./drawer";

export default async function Page() {
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
                  <Drawer />
                </HeadActionItem>
              </HeadActionResponsive>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl={8}>
              <TableSuratTemplate />
            </Col>
          </Row>
        </Block>
      </Content>
    </Providers>
  );
}
