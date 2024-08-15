import Modal from "../Modal";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../button/Button";

const ConfirmationModal = ({headerTitle, itemName, onClose, onConfirm}) => {
    return <Modal>
        <ModalHeader>
            <b>{headerTitle}</b>: Delete - {itemName}
        </ModalHeader>
        <ModalBody>
            Are you sure you want to delete <b>{itemName}</b>?
        </ModalBody>
        <ModalFooter>
            <Button className="cancel" onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm</Button>
        </ModalFooter>
    </Modal>
}

export default ConfirmationModal;