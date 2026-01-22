import { Spinner } from "react-bootstrap";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <Spinner animation="border" role="status" />
      <span className="loader-text">{text}</span>
    </div>
  );
};

export default Loader;
