import Box from "../../../common/box/Box";
import Table from "../../../common/table/Table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import MaterialModal from "./MaterialModal";
import {buildActions} from "../../../../utils/actionsBuilder";
import {replaceOrAdd} from "../../../../utils/utils";
import {renderActionButtons} from "../../../common/table/tableFormatters";
import ConfirmationModal from "../../../common/modal/confirmationModal/ConfirmationModal";
import {Warehouse} from "@mui/icons-material";
import InformationModal from "../../../common/modal/informationModal/InformationModal";

const Materials = () => {
    const [materials, setMaterials] = useState([])
    const [editedMaterial, setEditedMaterial] = useState()
    const [deletedMaterial, setDeletedMaterial] = useState()
    const [usedMaterial, setUsedMaterial] = useState()

    const actions = buildActions("material", "admin/materials")

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => 'Name'
        }),
        columnHelper.accessor('id', {
            cell: (info) => renderActionButtons(() => setEditedMaterial(info.row.original), () => setDeletedMaterial(info.row.original)),
            header: () => 'Actions'
        })

    ]

    useEffect(() => {
        actions.findAll(setMaterials)
    }, []);

    const handleSave = (material) => {
        setEditedMaterial(null)
        actions.save(material, (c) => setMaterials(prev => replaceOrAdd(prev, c)))
    }

    const handleDelete = (material) => {
        setDeletedMaterial(null)
        actions.remove(
            material,
            () => setMaterials(prev => prev.filter(prevC => prevC.id !== material.id)),
            e => {
                if (e.response.data === "Validation failed: Used in product") {
                    setUsedMaterial(true)
                } else {
                    throw e
                }
            }
        )
    }

    return <Box className="materials"
                header={{icon: <Warehouse/>, path: [{label: "Materials"}]}}
                onAdd={() => setEditedMaterial({})}
    >
        <Table columns={columns} data={materials}/>
        {editedMaterial &&
            <MaterialModal material={editedMaterial} onSave={handleSave} onClose={() => setEditedMaterial(null)}/>}
        {deletedMaterial && <ConfirmationModal icon={<Warehouse/>}
                                               headerTitle="Materials" itemName={deletedMaterial.name}
                                               onClose={() => setDeletedMaterial(null)}
                                               onConfirm={() => handleDelete(deletedMaterial)}
        />}
        {usedMaterial &&
            <InformationModal headerTitle="Materials" icon={<Warehouse/>}
                              onClose={() => setUsedMaterial(false)}>You cannot remove this material because it is
                currently assigned to one or more products.</InformationModal>}

    </Box>;
}

export default Materials