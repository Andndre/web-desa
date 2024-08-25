"use client";

import React, { useState } from "react";
import Icon from "@/components/icon/Icon";
import { Button } from "reactstrap";

export function HeadActionResponsive({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sm, updateSm] = useState(false);

  return (
    <div className="toggle-wrap nk-block-tools-toggle">
      <Button
        color=""
        className={`btn-icon btn-trigger toggle-expand me-n1 ${
          sm ? "active" : ""
        }`}
        onClick={() => updateSm(!sm)}
      >
        <Icon name="more-v" />
      </Button>
      <div
        className="toggle-expand-content"
        style={{ display: sm ? "block" : "none" }}
      >
        <ul className="nk-block-tools g-3">{children}</ul>
      </div>
    </div>
  );
}

export function HeadActionItem({ children }: { children: React.ReactNode }) {
  return <li className="nk-block-tools-opt">{children}</li>;
}
