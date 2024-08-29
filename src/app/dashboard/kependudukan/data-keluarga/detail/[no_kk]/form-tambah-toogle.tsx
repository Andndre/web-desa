"use client";

import Button from "@/components/button/Button";
import Icon from "@/components/icon/Icon";
import React, { useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import FormTambahPenduduk, {
  IFormTambahPenduduk,
} from "./form-tambah-penduduk";

function FormTambahToggle({ masters, nomor_kk }: IFormTambahPenduduk) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setShowOffcanvas(!showOffcanvas)}>
        <Icon name="plus" />
        <span>Tambah Data</span>
      </Button>
      <Offcanvas
        direction="end"
        isOpen={showOffcanvas}
        toggle={() => setShowOffcanvas(!showOffcanvas)}
      >
        <OffcanvasHeader toggle={() => setShowOffcanvas(!showOffcanvas)}>
          Tambah Data Penduduk
        </OffcanvasHeader>
        <OffcanvasBody>
          <FormTambahPenduduk masters={masters} nomor_kk={nomor_kk} />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default FormTambahToggle;
