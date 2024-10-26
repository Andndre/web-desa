"use client";

import Icon from "@/lib/components/icon/Icon";
import React, { useContext, useState } from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import FormTambahPenduduk from "./form-tambah-kk";
import { TableKeluargaContext } from "./providers";

function FormTambahToggle() {
  const { showOffcanvas, setShowOffcanvas } = useContext(TableKeluargaContext)!;

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
          <FormTambahPenduduk />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default FormTambahToggle;
