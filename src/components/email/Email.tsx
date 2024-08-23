import React from "react";

interface EmailWrapperProps {
  children: React.ReactNode
}

export const EmailWrapper = ({ ...props }: EmailWrapperProps) => {
  return (
    <table className="email-wraper">
      <tbody>
        <tr>
          <td className="py-5">{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
};

interface EmailHeaderProps {
  children: React.ReactNode
}

export const EmailHeader = ({ ...props }: EmailHeaderProps) => {
  return (
    <table className="email-header">
      <tbody>
        <tr>
          <td className="text-center pb-4">{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
};

interface EmailBodyProps {
  centered: boolean,
  children: React.ReactNode
}

export const EmailBody = ({ centered, ...props }: EmailBodyProps) => {
  return (
    <table className={`email-body ${centered ? "text-center" : ""}`}>
      <tbody>{props.children}</tbody>
    </table>
  );
};

interface EmailBodyContentProps {
  className: string, 
  children: React.ReactNode
}

export const EmailBodyContent = ({ className, ...props }: EmailBodyContentProps) => {
  return (
    <tr>
      <td className={`${className ? className : ""}`}>{props.children}</td>
    </tr>
  );
};

interface EmailFooterProps {
  children: React.ReactNode
}

export const EmailFooter = ({ ...props }: EmailFooterProps) => {
  return (
    <table className="email-footer">
      <tbody>
        <tr>
          <td className="text-center pt-4">{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
};
