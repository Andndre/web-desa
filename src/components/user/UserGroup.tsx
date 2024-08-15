import React from "react";

interface UserGroupProps {
  className?: string;
  children: React.ReactNode;
}

const UserGroup = ({ className, ...props }: UserGroupProps) => {
  return (
    <div className={`user-avatar-group ${className ? className : ""}`}>
      {props.children}
    </div>
  );
};

export default UserGroup;
