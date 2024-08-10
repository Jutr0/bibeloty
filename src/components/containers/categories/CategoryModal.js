import Modal from "../../common/modal/Modal";
import ModalHeader from "../../common/modal/ModalHeader";
import ModalBody from "../../common/modal/ModalBody";
import ModalFooter from "../../common/modal/ModalFooter";
import Button from "../../common/button/Button";
import Input from "../../common/form/Input";
import {useFormik} from "formik";
import FormGroup from "../../common/form/FormGroup";

const CategoryModal = ({category, onClose, onSave}) => {

    const formik = useFormik({
        initialValues: category
    })

    return <Modal toggle={onClose} size="lg">
        <ModalHeader>
            Category - new
        </ModalHeader>
        <ModalBody>
            <FormGroup>
                <Input name='name' autoFocus formik={formik} label="Name"/>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button className="cancel" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave(formik.values)}>Save</Button>
        </ModalFooter>
    </Modal>
}

export default CategoryModal;