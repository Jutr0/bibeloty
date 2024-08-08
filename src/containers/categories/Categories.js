import "./Categories.scss"
import Box from "../../common/box/Box";
import Table from "../../common/table/Table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {buildActions} from "../../utils/actionsBuilder";
import Modal from "../../common/modal/Modal";

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()
    const [deletedCategory, setDeletedCategory] = useState()

    const actions = buildActions("category", "categories")

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => 'Name'
        }),
        columnHelper.accessor('id', {
            cell: () => <div className="actions">
                edit, delete etc.
            </div>,
            header: () => 'Actions'
        })

    ]

    useEffect(() => {
        actions.findAll(setCategories)
    }, []);

    const handleAdd = () => {
        setCategory({})
    }

    const handleEdit = (category) => {
        setCategory(category)
    }

    const handleDelete = (category) => {
        setDeletedCategory(category)
    }

    return <Box className="categories">
        <Table columns={columns} data={categories} onAdd={handleAdd}/>
        {category && <Modal isOpen toggle={() => setCategory(null)}>Test</Modal>}
    </Box>;
}

export default Categories