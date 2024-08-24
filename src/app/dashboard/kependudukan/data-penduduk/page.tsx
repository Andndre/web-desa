import Content from "@/layout/admin/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "@/components/block/Block";
import { Col, Row } from "@/components/grid/Grid";
import TablePenduduk from "./table-penduduk";
import { pendudukData } from "@/server/data";
import FormTambahToggle from "./form-tambah-toggle";
import { HeadActionItem, HeadActionResponsive } from "@/components/block/HeadActionResponsive";

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
            {/* <div className="toggle-wrap nk-block-tools-toggle">
              <div
                className="toggle-expand-content"
                style={{ display: sm ? "block" : "none" }}
              >
                <ul className="nk-block-tools g-3">
                  <li className="nk-block-tools-opt">
                    <Button
                      color="primary"
                      onClick={() => setShowOffcanvas(!showOffcanvas)}
                    >
                      <Icon name="plus" />
                      <span>Tambah Data</span>
                    </Button>
                    <Offcanvas
                      direction="end"
                      isOpen={showOffcanvas}
                      toggle={() => setShowOffcanvas(!showOffcanvas)}
                    >
                      <OffcanvasHeader
                        toggle={() => setShowOffcanvas(!showOffcanvas)}
                      >
                        Tambah Data Penduduk
                      </OffcanvasHeader>
                      <OffcanvasBody>
                        <FormWrapperServer />
                      </OffcanvasBody>
                    </Offcanvas>
                  </li>
                </ul>
              </div>
            </div> */}
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
