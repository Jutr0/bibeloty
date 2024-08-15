import "./Categories.scss"
import Box from "../../common/box/Box";
import Table from "../../common/table/Table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import CategoryModal from "./CategoryModal";
import {buildActions} from "../../../utils/actionsBuilder";
import {replaceOrAdd} from "../../../utils/utils";
import {renderActionButtons} from "../../common/table/tableFormatters";
import ConfirmationModal from "../../common/modal/confirmationModal/ConfirmationModal";

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState()
    const [deletedCategory, setDeletedCategory] = useState()

    const actions = buildActions("category", "categories")

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => 'Name'
        }),
        columnHelper.accessor('id', {
            cell: (info) => renderActionButtons(() => setEditedCategory(info.row.original), () => setDeletedCategory(info.row.original)),
            header: () => 'Actions'
        })

    ]

    useEffect(() => {
        actions.findAll(setCategories)
    }, []);

    const handleSave = (category) => {
        setEditedCategory(null)
        actions.save(category, (c) => setCategories(prev => replaceOrAdd(prev, c)))
    }

    const handleDelete = (category) => {
        setDeletedCategory(null)
        actions.remove(category, () => setCategories(prev => prev.filter(prevC => prevC.id !== category.id)))
    }

    return <Box className="categories">
        <Table columns={columns} data={categories} onAdd={() => setEditedCategory({})}/>
        {editedCategory &&
            <CategoryModal category={editedCategory} onSave={handleSave} onClose={() => setEditedCategory(null)}/>}
        {deletedCategory && <ConfirmationModal headerTitle="Category" itemName={deletedCategory.name}
                                               onClose={() => setDeletedCategory(null)}
                                               onConfirm={() => handleDelete(deletedCategory)}
        />}
    </Box>;
}

export default Categories