"use client";

import { Col, Row } from "reactstrap";
import { Context } from "./providers";
import { useContext } from "react";

// NOTE: File ini berisi kode untuk mengubah komponen surat (field value) yang kemudian bisa digunakan pada tab Edit
export function FieldTable() {
  const { fields, setFields } = useContext(Context)!;
  return (
    <Row>
      <Col></Col>
    </Row>
  );
}
