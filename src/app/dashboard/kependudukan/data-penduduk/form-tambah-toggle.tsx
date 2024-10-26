"use client";

import Button from "@/lib/components/button/Button";
import Icon from "@/lib/components/icon/Icon";
import React, { useContext } from "react";
import { Offcanvas, OffcanvasHeader } from "reactstrap";
import FormTambahPenduduk, {
  IFormTambahPenduduk,
} from "./form-tambah-penduduk";
import SimpleBar from "simplebar-react";
import { TablePendudukContext } from "./providers";

function FormTambahToggle({
  masters,
}: Omit<IFormTambahPenduduk, "toggleDrawer">) {
  const { showOffcanvas, setShowOffcanvas } = useContext(TablePendudukContext)!;

  return (
    <>
      <Button color="primary" onClick={() => setShowOffcanvas(!showOffcanvas)}>
        <Icon name="plus" />
        <span>Tambah Penduduk</span>
      </Button>
      <Offcanvas
        direction="end"
        isOpen={showOffcanvas}
        toggle={() => setShowOffcanvas(!showOffcanvas)}
      >
        <OffcanvasHeader toggle={() => setShowOffcanvas(!showOffcanvas)}>
          Tambah Data Penduduk
        </OffcanvasHeader>
        <SimpleBar className="offcanvas-body h-100">
          <FormTambahPenduduk masters={masters} />
        </SimpleBar>
      </Offcanvas>
    </>
  );
}

export default FormTambahToggle;
