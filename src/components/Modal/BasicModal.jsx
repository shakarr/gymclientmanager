import { Modal, Icon } from "semantic-ui-react";

import "./modal.scss";

export const BasicModal = (props) => {
  const { show, onClose, title, size, width, children } = props;

  return (
    <Modal
      style={{ width: width }}
      open={show}
      size={size}
      onClose={onClose}
      className="basic-modal"
    >
      <Modal.Header>
        <div />
        <span>{title}</span>
        <Icon name="close" onClick={onClose} link />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};
