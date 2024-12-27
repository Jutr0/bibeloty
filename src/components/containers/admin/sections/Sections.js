import Box from "../../../common/box/Box";
import Table from "../../../common/table/Table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import SectionModal from "./SectionModal";
import {buildActions} from "../../../../utils/actionsBuilder";
import {replaceOrAdd} from "../../../../utils/utils";
import {renderActionButtons} from "../../../common/table/tableFormatters";
import ConfirmationModal from "../../../common/modal/confirmationModal/ConfirmationModal";
import {Segment, Warehouse} from "@mui/icons-material";
import InformationModal from "../../../common/modal/informationModal/InformationModal";

const Sections = () => {
    const [sections, setSections] = useState([])
    const [editedSection, setEditedSection] = useState()
    const [deletedSection, setDeletedSection] = useState()
    const [usedSection, setUsedSection] = useState()

    const actions = buildActions("section", "admin/sections")

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => 'Name'
        }),
        columnHelper.accessor('id', {
            cell: (info) => renderActionButtons(() => setEditedSection(info.row.original), () => setDeletedSection(info.row.original)),
            header: () => 'Actions'
        })

    ]

    useEffect(() => {
        actions.getAll(setSections)
    }, []);

    const handleSave = (section) => {
        setEditedSection(null)
        actions.save(section, (c) => setSections(prev => replaceOrAdd(prev, c)))
    }

    const handleDelete = (section) => {
        setDeletedSection(null)
        actions.remove(
            section,
            () => setSections(prev => prev.filter(prevC => prevC.id !== section.id)),
            e => {
                if (e.response.data === "Validation failed: Used in product") {
                    setUsedSection(true)
                } else {
                    throw e
                }
            }
        )
    }

    return <Box className="sections"
                header={{icon: <Segment/>, path: [{label: "Sections"}]}}
                onAdd={() => setEditedSection({})}
    >
        <Table columns={columns} data={sections}/>
        {editedSection &&
            <SectionModal section={editedSection} onSave={handleSave} onClose={() => setEditedSection(null)}/>}
        {deletedSection && <ConfirmationModal icon={<Segment />}
                                              headerTitle="Sections" itemName={deletedSection.name}
                                              onClose={() => setDeletedSection(null)}
                                              onConfirm={() => handleDelete(deletedSection)}
        />}
        {usedSection &&
            <InformationModal headerTitle="Sections" icon={<Segment />}
                              onClose={() => setUsedSection(false)}>You cannot remove this section because it is
                currently assigned to one or more products.</InformationModal>}

    </Box>;
}

export default Sections