import Button from "../button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const renderActionButtons = (onEdit, onDelete, externalButtons) => {
    return <div className="actions">
        {onEdit && <Button icon onClick={onEdit}><EditIcon/></Button>}
        {onDelete && <Button icon onClick={onDelete}><DeleteIcon/></Button>}
        {externalButtons}
    </div>
}