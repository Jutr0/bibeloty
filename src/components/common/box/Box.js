import './Box.scss'
import classnames from "classnames";

const Box = ({header, children}) => {
    return <div className={classnames("box")}>
        {header &&
            <div className="header">
                {header.icon && header.icon}
                {header.path.map((p, idx) => <>
                    <span>{p.label}</span> {idx < header.path.length - 1 && <b>></b>}
                </>)}
            </div>
        }
        <div className='body'>{children}</div>
    </div>
}

export default Box;