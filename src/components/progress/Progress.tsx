import React from "react";
import classNames from "classnames";

interface ProgressProps {
  value: number;
  size: "sm" | "md" | "lg";
  className: string;
}

const Progress = ({ value, size, className }: ProgressProps) => {
  const progressClass = classNames({
    progress: true,
    [`progress-${size}`]: size,
    [`${className}`]: className,
  });

  return (
    <div className={progressClass}>
      <div
        className="progress-bar"
        style={{ width: `${value}%`, backgroundColor: "#0fac81" }}
      ></div>
      <div className="progress-amount">{value}%</div>
    </div>
  );
};

export default Progress;
