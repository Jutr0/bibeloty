import Modal from "../Modal";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../../button/Button";

const InformationModal = ({headerTitle, onClose, icon, children}) => {
    return <Modal toggle={onClose}>
        <ModalHeader icon={icon}>
            <b>{headerTitle}</b>
        </ModalHeader>
        <ModalBody>
            {children}
        </ModalBody>
        <ModalFooter>
            <Button onClick={onClose}>Close</Button>
        </ModalFooter>
    </Modal>
}

export default InformationModal;