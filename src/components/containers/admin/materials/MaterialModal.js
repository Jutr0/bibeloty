import Modal from "../../../common/modal/Modal";
import ModalHeader from "../../../common/modal/ModalHeader";
import ModalBody from "../../../common/modal/ModalBody";
import ModalFooter from "../../../common/modal/ModalFooter";
import Button from "../../../common/button/Button";
import Input from "../../../common/form/input/Input";
import {useFormik} from "formik";
import FormGroup from "../../../common/form/formGroup/FormGroup";
import * as Yup from 'yup';
import {Warehouse} from "@mui/icons-material";

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Required'),
});

const MaterialModal = ({material, onClose, onSave}) => {

    const formik = useFormik({
        initialValues: material,
        onSubmit: newMaterial => {
            onSave(newMaterial)
        },
        validationSchema
    })

    return <Modal toggle={onClose} size="lg">
        <ModalHeader icon={<Warehouse/>}>
            <b>Materials</b>: {material.name ? `${material.name} - Edit` : "New"}
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

export default MaterialModal;