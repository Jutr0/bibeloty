import './FormGroup.scss'

const FormGroup = ({children, onSubmit}) => {
    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit && onSubmit(e)
    }

    return <form className='form-group' onSubmit={handleSubmit}>{children}</form>
}

export default FormGroup