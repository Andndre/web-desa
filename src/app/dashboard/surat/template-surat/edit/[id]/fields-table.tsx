"use client";

import { Col, Row } from "reactstrap";
import { Context } from "./providers";
import { useContext } from "react";

export function FieldTable() {
  const { fields, setFields } = useContext(Context)!;
  return (
    <Row>
      <Col></Col>
    </Row>
  );
}
