import Box from "../../../common/box/Box";
import Table from "../../../common/table/Table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import CategoryModal from "./CategoryModal";
import {buildActions} from "../../../../utils/actionsBuilder";
import {replaceOrAdd} from "../../../../utils/utils";
import {renderActionButtons} from "../../../common/table/tableFormatters";
import ConfirmationModal from "../../../common/modal/confirmationModal/ConfirmationModal";
import CategoryIcon from "@mui/icons-material/Category";
import InformationModal from "../../../common/modal/informationModal/InformationModal";

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState()
    const [deletedCategory, setDeletedCategory] = useState()
    const [usedCategory, setUsedCategory] = useState()

    const actions = buildActions("category", "admin/categories")

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
        actions.remove(
            category,
            () => setCategories(prev => prev.filter(prevC => prevC.id !== category.id)),
            e => {
                if (e.response.data === "Validation failed: Used in product") {
                    setUsedCategory(true)
                } else {
                    throw e
                }
            }
        )
    }

    return <Box className="categories"
                header={{icon: <CategoryIcon/>, path: [{label: "Categories"}]}}
                onAdd={() => setEditedCategory({})}
    >
        <Table columns={columns} data={categories}/>
        {editedCategory &&
            <CategoryModal category={editedCategory} onSave={handleSave} onClose={() => setEditedCategory(null)}/>}
        {deletedCategory && <ConfirmationModal icon={<CategoryIcon/>}
                                               headerTitle="Categories" itemName={deletedCategory.name}
                                               onClose={() => setDeletedCategory(null)}
                                               onConfirm={() => handleDelete(deletedCategory)}
        />}
        {usedCategory &&
            <InformationModal headerTitle="Categories" icon={<CategoryIcon/>}
                              onClose={() => setUsedCategory(false)}>You cannot remove this category because it is
                currently assigned to one or more products.</InformationModal>}
    </Box>;
}

export default Categories