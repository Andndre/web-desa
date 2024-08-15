import React from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";
import Link from "next/link";

interface BlockProps {
  className?: string;
  size?: "lg" | "md" | "sm";
  [key: string]: any;
}

export const Block = ({ className, size, ...props }: BlockProps) => {
  const blockClass = classNames({
    "nk-block": true,
    [`nk-block-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={blockClass}>{props.children}</div>;
};

interface BlockContentProps {
  className?: string;
  [key: string]: any;
}

export const BlockContent = ({ className, ...props }: BlockContentProps) => {
  const blockContentClass = classNames({
    "nk-block-content": true,
    [`${className}`]: className,
  });
  return <div className={blockContentClass}>{props.children}</div>;
};

interface BlockBetweenProps {
  className?: string;
  [key: string]: any;
}

export const BlockBetween = ({ className, ...props }: BlockBetweenProps) => {
  return (
    <div className={`nk-block-between ${className ? className : ""}`}>
      {props.children}
    </div>
  );
};

interface BlockHeadProps {
  className?: string;
  size?: "lg" | "md" | "sm";
  wide?: "xl" | "lg" | "md" | "sm";
  [key: string]: any;
}

export const BlockHead = ({
  className,
  size,
  wide,
  ...props
}: BlockHeadProps) => {
  const blockHeadClass = classNames({
    "nk-block-head": true,
    [`nk-block-head-${size}`]: size,
    [`wide-${wide}`]: wide,
    [`${className}`]: className,
  });
  return <div className={blockHeadClass}>{props.children}</div>;
};

interface BlockHeadContentProps {
  className?: string;
  [key: string]: any;
}

export const BlockHeadContent = ({
  className,
  ...props
}: BlockHeadContentProps) => {
  return (
    <div className={`nk-block-head-content${className ? " " + className : ""}`}>
      {props.children}
    </div>
  );
};

interface BlockHeadBetweenProps {
  className?: string;
  [key: string]: any;
}

export const BlockTitle = ({
  className,
  page,
  ...props
}: BlockHeadBetweenProps) => {
  const classes = `nk-block-title ${page ? "page-title" : "title"}${
    className ? " " + className : ""
  }`;
  return (
    <React.Fragment>
      {!props.tag ? (
        <h3 className={classes}>{props.children}</h3>
      ) : (
        <props.tag className={classes}>{props.children}</props.tag>
      )}
    </React.Fragment>
  );
};

interface BlockDesProps {
  className?: string;
  [key: string]: any;
}

export const BlockDes = ({ className, page, ...props }: BlockDesProps) => {
  const classes = `nk-block-des${className ? " " + className : ""}`;
  return <div className={classes}>{props.children}</div>;
};

interface BackToProps {
  className?: string;
  link: string;
  icon: string;
  [key: string]: any;
}

export const BackTo = ({ className, link, icon, ...props }: BackToProps) => {
  const classes = `back-to${className ? " " + className : ""}`;
  return (
    <div className="nk-block-head-sub">
      <Link className={classes} href={process.env.PUBLIC_URL + link} legacyBehavior>
        <Icon name={icon} />
        <span>{props.children}</span>
      </Link>
    </div>
  );
};
