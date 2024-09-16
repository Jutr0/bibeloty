import withForm from "../withForm";
import classnames from "classnames";
import './Input.scss'

const Input = ({id, autoFocus, name, onChange, className, value, type, onBlur}) => {

    const handleChange = e => onChange(e.target.value)
    return (
        <input
            id={id}
            autoFocus={autoFocus}
            name={name}
            onChange={handleChange}
            className={classnames("input", className)}
            value={value}
            type={type}
            onBlur={onBlur}
        />
    )
}

export default withForm(Input);