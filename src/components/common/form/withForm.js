import classnames from "classnames";

const withForm = Component => ({formik, name, label, required, ...props}) => {
    const error = (formik.submitCount || formik.touched[name]) && formik.errors[name];

    const handleChange = (value) => {
        formik.setFieldValue(name, value).then(() => {
            if (formik.submitCount > 0) {
                formik.validateForm()
            }
        })
    }

    return <div className='form-field'>
        {label && <label className={classnames("label", {required})} htmlFor={name}>
            {label}
        </label>}
        <Component
            className={classnames("form-input", {error})}
            id={name}
            name={name}
            value={formik.values[name]}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            {...props}
        />
        {error && <span className="error">{error}</span>}
    </div>
}


export default withForm;