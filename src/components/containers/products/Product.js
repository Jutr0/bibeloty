import Box from "../../common/box/Box";
import InventoryIcon from "@mui/icons-material/Inventory";
import {useFormik} from "formik";
import FormGroup from "../../common/form/formGroup/FormGroup";
import Input from "../../common/form/input/Input";
import {useNavigate, useParams} from "react-router";
import {buildActions, get, save} from "../../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Select from "../../common/form/select/Select";
import TextArea from "../../common/form/textArea/TextArea";

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required'),
    price: Yup.number('Must be a number').positive('Must be positive')
        .required('Required'),
    category: Yup.object()
        .required('Required')
});

const toApi = product => ({
    ...product,
    category_id: product.category.id,
    material_ids: product.materials.map(m => m.id)
})

const Product = () => {
    const [initialName, setInitialName] = useState("New")

    const actions = {
        ...buildActions("product"),
        searchCategories: (query, callback) => get("products/search_categories", callback, {q: query}),
        createCategory: (category, callback) => save('categories', "POST", {category}, callback),
        searchMaterials: (query, callback) => get("products/search_materials", callback, {q: query}),
        createMaterial: (material, callback) => save('materials', "POST", {material}, callback)
    }

    const formik = useFormik({
        initialValues: {materials: []},
        validationSchema,
        onSubmit: values => {
            actions.save(toApi(values), () => navigate('/products'))
        }
    })
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id !== "new") {
            actions.findOne(id, product => {
                setInitialName(product.name)
                formik.setValues(product)
            })
        }
    }, [id]);

    const handleCreateCategory = (name, callback) => {
        actions.createCategory({name}, callback)
    }

    const handleCreateMaterial = (name, callback) => {
        actions.createMaterial({name}, callback)
    }

    return <Box className="product"
                header={{icon: <InventoryIcon/>, path: [{label: "Products"}, {label: initialName}]}}
                onSave={formik.handleSubmit}
                onCancel={() => navigate('/products')}
    >
        <FormGroup>
            <Input required name='name' formik={formik} label="Name"/>
            <TextArea required name='description' formik={formik} label="Description"/>
            <Input required name='price' formik={formik} label="Price" type="number"/>
            <Select onCreate={handleCreateCategory} required name='category' formik={formik} label="Category"
                    search={actions.searchCategories}/>
            <Select isMulti onCreate={handleCreateMaterial} required name='materials' formik={formik} label="Materials"
                    search={actions.searchMaterials}/>
        </FormGroup>
    </Box>
}

export default Product