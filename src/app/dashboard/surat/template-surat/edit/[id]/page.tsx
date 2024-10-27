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
import { QuillComponent } from "@/lib/components/rich-editor/QuillComponent";
import { Tabs } from "./tabs";
import { FieldTable } from "./fields-table";
import { getSuratTemplateFields } from "@/lib/server/data/surat";
import { Providers } from "./providers";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id || +id < 1) return null;
  const fields = await getSuratTemplateFields(+id);

  return (
    <Providers initialFields={fields} id={+id}>
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
                titles={["Edit", "Fields"]}
                components={[
                  <QuillComponent placeholder="Mulai tulis template surat..." />,
                  <FieldTable />,
                ]}
              />
            </Col>
          </Row>
        </Block>
      </Content>
    </Providers>
  );
}
