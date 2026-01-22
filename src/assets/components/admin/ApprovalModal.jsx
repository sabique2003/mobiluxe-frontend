import { Modal, Button } from "react-bootstrap";

const ApprovalModal = ({
  show,
  onHide,
  onConfirm,
  title = "Confirm Action",
  bodyText = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  confirmVariant = "success",
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{bodyText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovalModal;
