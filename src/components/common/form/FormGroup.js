import './FormGroup.scss'

const FormGroup = ({children, onSubmit}) => {
    return <form className='form-group' onSubmit={onSubmit}>{children}</form>
}

export default FormGroup