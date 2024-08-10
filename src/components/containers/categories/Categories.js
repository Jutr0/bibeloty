import "./Categories.scss"
import Box from "../../common/box/Box";
import Table from "../../common/table/Table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import CategoryModal from "./CategoryModal";
import {buildActions} from "../../../utils/actionsBuilder";
import {replaceOrAdd} from "../../../utils/utils";

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

    const handleSave = (category) =>{
        actions.save(category, (c) => setCategories(prev => replaceOrAdd(prev, c)))
    }

    const handleEdit = (category) => {
        setCategory(category)
    }

    const handleDelete = (category) => {
        setDeletedCategory(category)
    }

    return <Box className="categories">
        <Table columns={columns} data={categories} onAdd={() => setCategory({})}/>
        {category && <CategoryModal category={category} onSave={handleSave} onClose={() => setCategory(null)}/>}
    </Box>;
}

export default Categories