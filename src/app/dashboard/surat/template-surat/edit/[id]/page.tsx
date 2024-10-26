import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
} from "@/lib/components/block/Block";
import Content from "@/lib/components/layout/admin/content/Content";
import { Row, Col } from "reactstrap";
import { QuillComponentMinimal } from "@/lib/components/rich-editor/QuillComponent";
import { Tabs } from "./tabs";

export default async function Page() {
  return (
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Surat Template
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Berikut merupakan daftar surat template yang sudah dibuat</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <Block>
        <Row className="g-gs">
          <Col xxl={8}>
            <Tabs
              titles={["Edit"]}
              components={[
                <QuillComponentMinimal placeholder="Mulai tulis template surat..." />,
              ]}
            />
          </Col>
        </Row>
      </Block>
    </Content>
  );
}
