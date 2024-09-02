"use client";

import Button from "@/components/button/Button";
import Icon from "@/components/icon/Icon";
import React, { useState } from "react";
import { Offcanvas, OffcanvasHeader } from "reactstrap";
import FormTambahPenduduk, {
  IFormTambahPenduduk,
} from "./form-tambah-penduduk";
import SimpleBar from "simplebar-react";

function FormTambahToggle({
  masters,
}: Omit<IFormTambahPenduduk, "toggleDrawer">) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

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
          <FormTambahPenduduk
            masters={masters}
            toggleDrawer={() => setShowOffcanvas(!showOffcanvas)}
          />
        </SimpleBar>
      </Offcanvas>
    </>
  );
}

export default FormTambahToggle;
