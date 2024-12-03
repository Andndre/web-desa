"use client";

import Icon from "@/lib/components/icon/Icon";
import { useContext } from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import FormTambah from "./form-tambah";
import { Context } from "./providers";

function Drawer() {
  const { showOffcanvas, setShowOffcanvas } = useContext(Context)!;

  return (
    <>
      <Button color="primary" onClick={() => setShowOffcanvas(!showOffcanvas)}>
        <Icon name="plus" />
        <span>Tambah Template Surat</span>
      </Button>
      <Offcanvas
        direction="end"
        isOpen={showOffcanvas}
        toggle={() => setShowOffcanvas(!showOffcanvas)}
      >
        <OffcanvasHeader toggle={() => setShowOffcanvas(!showOffcanvas)}>
          Tambah Template Surat
        </OffcanvasHeader>
        <OffcanvasBody>
          <FormTambah />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default Drawer;
