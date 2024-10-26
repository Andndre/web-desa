"use client";

import Button from "@/lib/components/button/Button";
import Icon from "@/lib/components/icon/Icon";
import React, { useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import FormTambahPenduduk from "./form-tambah-kk";

function FormTambahToggle() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  function toggleDrawer() {
    setShowOffcanvas(!showOffcanvas);
  }

  return (
    <>
      <Button color="primary" onClick={() => setShowOffcanvas(!showOffcanvas)}>
        <Icon name="plus" />
        <span>Tambah Kartu Keluarga</span>
      </Button>
      <Offcanvas
        direction="end"
        isOpen={showOffcanvas}
        toggle={() => setShowOffcanvas(!showOffcanvas)}
      >
        <OffcanvasHeader toggle={() => setShowOffcanvas(!showOffcanvas)}>
          Tambah Data Kartu Keluarga
        </OffcanvasHeader>
        <OffcanvasBody>
          <FormTambahPenduduk toggleDrawer={toggleDrawer} />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default FormTambahToggle;
