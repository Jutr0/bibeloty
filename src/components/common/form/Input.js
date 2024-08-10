import withForm from "./withForm";
import classnames from "classnames";
import './Input.scss'

const Input = ({id, autoFocus, name, onChange, className, ...props}) => {
    return (
        <input
            id={id}
            autoFocus={autoFocus}
            name={name}
            onChange={onChange}
            className={classnames("input", className)}
            {...props}
        />
    )
}

export default withForm(Input);