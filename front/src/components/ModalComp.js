import ModalPortal from "./ModalPortal";
import { Modal } from "react-bootstrap";

const ModalComp = ({ show, setShow, title, message, children }) => {
  return (
    <ModalPortal>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>{children}</Modal.Footer>
      </Modal>
    </ModalPortal>
  );
};

export default ModalComp;
