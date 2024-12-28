import classnames from 'classnames';
import './Button.scss'

const Button = ({className, onClick, children, icon = false, disabled = false}) => {

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick && onClick(e)
    }

    return <button disabled={disabled} className={classnames('button', className, {icon, disabled})} onClick={handleClick}>
        {children}
    </button>
}

export default Button;