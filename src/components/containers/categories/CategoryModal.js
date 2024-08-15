import Modal from "../../common/modal/Modal";
import ModalHeader from "../../common/modal/ModalHeader";
import ModalBody from "../../common/modal/ModalBody";
import ModalFooter from "../../common/modal/ModalFooter";
import Button from "../../common/button/Button";
import Input from "../../common/form/Input";
import {useFormik} from "formik";
import FormGroup from "../../common/form/FormGroup";
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Required'),
});

const CategoryModal = ({category, onClose, onSave}) => {

    const formik = useFormik({
        initialValues: category,
        onSubmit: newCategory => {
            onSave(newCategory)
        },
        validationSchema
    })

    return <Modal toggle={onClose} size="lg">
        <ModalHeader>
            Category - {category.name || "New"}
        </ModalHeader>
        <ModalBody>
            <FormGroup onSubmit={formik.handleSubmit}>
                <Input required name='name' autoFocus formik={formik} label="Name"/>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button className="cancel" onClick={onClose}>Cancel</Button>
            <Button onClick={formik.handleSubmit}>Save</Button>
        </ModalFooter>
    </Modal>
}

export default CategoryModal;