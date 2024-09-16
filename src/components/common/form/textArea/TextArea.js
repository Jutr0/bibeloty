import withForm from "../withForm";
import classnames from "classnames";
import './TextArea.scss'

const TextArea = ({id, autoFocus, name, onChange, className, value, onBlur}) => {

    const handleChange = e => onChange(e.target.value)
    return (
        <textarea
            id={id}
            autoFocus={autoFocus}
            name={name}
            onChange={handleChange}
            className={classnames("textarea", className)}
            value={value}
            onBlur={onBlur}
        />
    )
}

export default withForm(TextArea);