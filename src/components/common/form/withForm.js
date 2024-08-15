import classnames from "classnames";

const withForm = Component => ({formik, name, label, required, ...props}) => {
    const error = (formik.submitCount || formik.touched[name]) && formik.errors[name];
    return <div className='form-field'>
        {label && <label className={classnames("label", {required})} htmlFor={name}>
            {label}
        </label>}
        <Component
            className={classnames("form-input", {error})}
            id={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            {...props}
        />
        {error && <span className="error">{error}</span>}
    </div>
}


export default withForm;