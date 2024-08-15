import classNames from "classnames";
import React from "react";
import { Card } from "reactstrap";

interface Props {
  className?: string;
  bodyClassName?: string;
  title?: string;

  [key: string]: any;
}

export const DataTable = ({
  className,
  bodyClassName,
  title,
  ...props
}: Props) => {
  return (
    <Card className={`card-bordered ${className ? className : ""}`}>
      <div className="card-inner-group">{props.children}</div>
    </Card>
  );
};

export const DataTableTitle = ({ ...props }: { children: React.ReactNode }) => {
  return (
    <div className="card-inner position-relative card-tools-toggle">
      <div className="card-title-group">{props.children}</div>
    </div>
  );
};

interface DataTableBodyProps {
  compact?: boolean;
  className?: string;
  bodyclass?: string;
  [key: string]: any;
}

export const DataTableBody = ({
  compact,
  className,
  bodyclass,
  ...props
}: DataTableBodyProps) => {
  return (
    <div className={`card-inner p-0 ${className ? className : ""}`}>
      <div
        className={`nk-tb-list nk-tb-ulist ${bodyclass ? bodyclass : ""} ${
          compact ? "is-compact" : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export const DataTableHead = ({ ...props }) => {
  return <div className="nk-tb-item nk-tb-head">{props.children}</div>;
};

interface DataTableRow {
  className?: string;
  size?: string;
  children: React.ReactNode;

  [key: string]: any;
}

export const DataTableRow = ({ className, size, ...props }: DataTableRow) => {
  const rowClass = classNames({
    "nk-tb-col": true,
    [`${className}`]: className,
    [`tb-col-${size}`]: size,
  });
  return <div className={rowClass}>{props.children}</div>;
};

export const DataTableItem = ({
  className,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`nk-tb-item ${className ? className : ""}`}>
      {props.children}
    </div>
  );
};
