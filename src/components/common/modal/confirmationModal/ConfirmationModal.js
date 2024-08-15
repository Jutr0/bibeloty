import Modal from "../Modal";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../button/Button";
import './ConfirmationModal.scss'

const ConfirmationModal = ({headerTitle, itemName, onClose, onConfirm, icon}) => {
    return <Modal className='confirmation-modal'>
        <ModalHeader icon={icon}>
            <b>{headerTitle}</b>: {itemName} - Delete
        </ModalHeader>
        <ModalBody>
            Are you sure you want to delete <b className='item-name'>{itemName}</b>?
        </ModalBody>
        <ModalFooter>
            <Button className="cancel" onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm</Button>
        </ModalFooter>
    </Modal>
}

export default ConfirmationModal;