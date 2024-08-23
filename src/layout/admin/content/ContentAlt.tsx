import React from "react";

interface ContentAltProps {
  page?: string;
  children: React.ReactNode;
}

const ContentAlt = ({ page, children }: ContentAltProps) => {
  return (
    <div className="nk-content p-0">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          {!page ? children : null}
          {page === "component" ? (
            <div className="components-preview wide-md mx-auto">{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ContentAlt;
