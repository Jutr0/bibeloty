const withForm = Component => ({formik, name, label, ...props}) => {
    const error = formik.touched[name] && formik.errors[name];
    return <div className='form-field'>
        {label && <label className="label" htmlFor={name}>
            {label}
        </label>}
        <Component
            className="form-input"
            id={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            {...props}
        />
        {error && <span>{error}</span>}
    </div>
}


export default withForm;