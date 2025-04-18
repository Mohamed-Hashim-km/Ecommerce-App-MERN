import { Spinner } from "react-bootstrap";

const Loader = () => {
  return <Spinner animation="border" role="status" style={{ margin: "auto", width: "100px", height: "100px", display: "block" }}></Spinner>;
};

export default Loader;
