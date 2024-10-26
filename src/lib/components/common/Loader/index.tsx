interface ILoader {
  customHeight?: string;
}

const Loader = ({ customHeight }: ILoader) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: customHeight || "100vh" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
