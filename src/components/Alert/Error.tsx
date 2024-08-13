import { AlertCircle } from "react-feather";

interface ErrorProps {
  error: string;
}

export default function ({ error }: ErrorProps) {
  if (!error) return null;
  return (
    <div>
      <div className="bg-danger/20 border text-danger px-4 py-3 rounded relative flex gap-3">
        <AlertCircle size={20} /> <span>{error}</span>
      </div>
      <div className="pt-3"></div>
    </div>
  );
}
