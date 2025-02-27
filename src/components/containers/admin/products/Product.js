import Box from "../../../common/box/Box";
import InventoryIcon from "@mui/icons-material/Inventory";
import {useFormik} from "formik";
import FormGroup from "../../../common/form/formGroup/FormGroup";
import Input from "../../../common/form/input/Input";
import {useNavigate, useParams} from "react-router";
import {buildActions, get, save} from "../../../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Select from "../../../common/form/select/Select";
import TextArea from "../../../common/form/textArea/TextArea";
import Dropzone from "../../../common/form/dropzone/Dropzone";
import _ from "lodash";

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required'),
    price: Yup.number('Must be a number').positive('Must be positive')
        .required('Required'),
    category: Yup.object()
        .required('Required'),
    section: Yup.object()
        .required('Required'),
    materials: Yup.array()
        .min(1, 'Required')
        .required('Required')
});

const toApi = product => _.omit({
    ...product,
    category_id: product.category.id,
    section_id: product.section.id,
    material_ids: product.materials.map(m => m.id),
    product_sizes_attributes: product.sizes,
    product_documents_attributes: toApiDocuments(product.product_documents)
}, "category", "materials", "product_documents", "section", "sizes")

const toApiDocuments = documents => documents?.map(m => ({
    ..._.omit(m, 'document'),
    document_id: m.document.id
}))

const sizeSelectFormatter = {
    toSelect: (option) => ({...option, label: option?.size, value: option?.id}),
    toFormik: (option) => ({...option, size: option?.label, id: option?.value})
}

const Product = () => {
    const [initialName, setInitialName] = useState("New")
    const actions = {
        ...buildActions("product", "admin/products"),
        searchCategories: (query, callback) => get("admin/products/search_categories", callback, {q: query}),
        createCategory: (category, callback) => save('admin/categories', "POST", {category}, callback),
        searchMaterials: (query, callback) => get("admin/products/search_materials", callback, {q: query}),
        createMaterial: (material, callback) => save('admin/materials', "POST", {material}, callback),
        searchSections: (query, callback) => get("admin/products/search_sections", callback, {q: query}),
        createSection: (section, callback) => save('admin/sections', "POST", {section}, callback)
    }

    const formik = useFormik({
        initialValues: {materials: [], product_documents: [], sizes: []},
        validationSchema,
        onSubmit: values => actions.save(toApi(values), () => navigate('/admin/products'))
    })

    const navigate = useNavigate();
    const {id} = useParams();

    const isNew = id === "new"

    useEffect(() => {
        if (!isNew) {
            actions.getOne(id, product => {
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
    const handleCreateSize = (size, callback) => {
        callback({size})
    }
    const handleCreateSection = (name, callback) => {
        actions.createSection({name}, callback)
    }

    function saveDocuments(documents) {
        if (!isNew) {
            actions.save(
                {id, product_documents_attributes: toApiDocuments(documents)},
                ({product_documents}) => formik.setFieldValue("product_documents", product_documents)
            )
        } else {
            formik.setFieldValue("product_documents", documents)
        }
    }

    const onUploadDocument = (document) => {
        const newPosition = formik.values.product_documents.length;
        const documents = [...formik.values.product_documents, {
            document,
            position: newPosition
        }]
        saveDocuments(documents);
    }

    const onDeleteDocument = (documentId) => {
        let documents;
        if (isNew) {
            documents = formik.values.product_documents.filter(item => item.id !== documentId)
        } else {
            documents = formik.values.product_documents.map(pd => ({
                ...pd,
                _destroy: pd.document.id === documentId
            }))
        }

        documents.sort((a, b) => a.position < b.position ? -1 : 1)
            .forEach((d, idx) => d.position = idx)

        saveDocuments(documents)
    }

    return <Box className="product"
                header={{icon: <InventoryIcon/>, path: [{label: "Products"}, {label: initialName}]}}
                onSave={formik.handleSubmit}
                onCancel={() => navigate('/admin/products')}
    >
        <FormGroup>
            <Input required name='name' formik={formik} label="Name"/>
            <TextArea required name='description' formik={formik} label="Description"/>
            <Input required name='price' formik={formik} label="Price" type="number"/>
            <Select onCreate={handleCreateCategory} required name='category' formik={formik} label="Category"
                    search={actions.searchCategories}/>
            <Select onCreate={handleCreateSection} required name='section' formik={formik} label="Section"
                    search={actions.searchSections}/>
            <Select isMulti onCreate={handleCreateMaterial} required name='materials' formik={formik} label="Materials"
                    search={actions.searchMaterials}/>
            <Select isMulti formatter={sizeSelectFormatter} onCreate={handleCreateSize} name='sizes' formik={formik}
                    label="Sizes"/>
            <Dropzone onChange={onUploadDocument} onDelete={onDeleteDocument} name='documents' formik={formik}
                      value={formik.values.product_documents.map(cd => cd.document)}
                      label="Images"/>
        </FormGroup>
    </Box>
}

export default Product