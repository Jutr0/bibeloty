import './Box.scss'
import classnames from "classnames";
import Button from "../button/Button";

const Box = ({header, onAdd, onCancel, onSave, children}) => {
    return <div className={classnames("box")}>
        {header &&
            <div className="header">
                <div className="breadcrumbs">
                    {header.icon && header.icon}
                    {header.path.map((p, idx) => <>
                        <span>{p.label}</span> {idx < header.path.length - 1 && <b>></b>}
                    </>)}
                </div>
                <div className="buttons">
                    {onCancel && <Button onClick={onCancel} className="cancel">Cancel</Button>}
                    {onAdd && <Button onClick={onAdd}> Add new +</Button>}
                    {onSave && <Button onClick={onSave}>Save</Button>}
                </div>
            </div>
        }
        <div className='body'>{children}</div>
    </div>
}

export default Box;