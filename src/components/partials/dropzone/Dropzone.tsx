import React from "react";

interface DropzoneContainerProps {
  input: React.ReactNode;
  previews: React.
ReactNode;
  submitButton: React.ReactNode;
  files: File[];
  extra: {
    maxFiles: number;
  };
}

const DropzoneContainer: React.FC<DropzoneContainerProps> = (props) => {
  const {
    input,

    previews,
    submitButton,
    files,
    extra: { maxFiles },
  } = props;
  return (
    <div
      style={{ overflow: "hidden" }}
    >
      {previews}

      {files.length < maxFiles && input}

      {files.length > 0 && submitButton}
    </div>
  );
};

export default DropzoneContainer;
